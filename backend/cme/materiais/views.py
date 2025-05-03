from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from .serializers import MaterialSerializer, EtapaSerializer
from .models import Material, Etapa
from django.db.models import QuerySet
from unicodedata import normalize
from functools import lru_cache
from django.http import FileResponse
from io import BytesIO
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import letter, landscape
from datetime import datetime
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors
from typing import Protocol
from openpyxl.styles import Alignment
from openpyxl.worksheet.worksheet import Worksheet


ETAPA_TO_COLUMN = {
    'Recebimento': 'quant_recebido',
    'Lavagem': 'quant_lavagem',
    'Esterilizacao': 'quant_esterilizacao',
    'Distribuicao': 'quant_distribuicao'
}

@api_view(['POST'])
def criar_material(request: Request):
    print(f'Requisição: {request.data}')
    serializer_material: MaterialSerializer = MaterialSerializer(data=request.data)
    if serializer_material.is_valid():
        material: Material = serializer_material.save()
        return criar_etapa(material, serializer_material)
    print(f'Erros de validação: {serializer_material.errors}')
    return Response(serializer_material.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deletar_material(request: Request, serial_id: str):
    try:
        if not serial_id:
            return Response(
                {'error': 'O campo "serial" é obrigatório!'},
                status= status.HTTP_400_BAD_REQUEST
            )
        material: Material = Material.objects.get(serial= serial_id)
        material.delete()
        return Response(
            {'success', f'Material {material.serial} deletado com sucesso!'},
            status= status.HTTP_200_OK
        )
    except Material.DoesNotExist:
        return Response(
            {'error': f'Material com serial ({serial_id}) não encontrado!'},    
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': f'Erro inesperado: {e}'},    
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

def criar_etapa(material: Material, serializer_material: MaterialSerializer):
    etapa: dict= {
        'serial' : material.serial
    }
    serializer_etapa: EtapaSerializer = EtapaSerializer(data= etapa)
    print(serializer_etapa)
    if serializer_etapa.is_valid():
        serializer_etapa.save()
        response_data: dict = {
            'material' : serializer_material.data,
            'etapa' : serializer_etapa.data
        }
        return Response(response_data, status= status.HTTP_201_CREATED)
    
    print(f'Erros de validação: {serializer_etapa.errors}')
    return Response(serializer_etapa.errors, status=status.HTTP_400_BAD_REQUEST)

@lru_cache(maxsize=1024)
def remover_acentos(texto: str) -> str:
    return normalize('NFD', texto)\
           .encode('ascii', 'ignore')\
           .decode('ascii')\
           .replace('?', 'c')\
           .replace('?', 'C')

@api_view(['PATCH', 'PUT'])
def atualizar_etapa(request: Request, serial_id: str):
    dado_requisicao: dict = request.data
    print(f'Dados recebidos: {dado_requisicao}')
    try:
        nome_etapa: str = remover_acentos(dado_requisicao.get('etapa'))

        if not serial_id or not nome_etapa:
            return Response(
                {'error': 'Os campos "serial" e "etapa" são obrigatorios'},
                status= status.HTTP_400_BAD_REQUEST
            )

        etapa: Etapa = Etapa.objects.get(serial = serial_id)
        etapa.etapa = nome_etapa
        nome_coluna: str = ETAPA_TO_COLUMN[nome_etapa]

        setattr(etapa, nome_coluna, getattr(etapa, nome_coluna) + 1)
        etapa.save()
        serializer_etapa: EtapaSerializer = EtapaSerializer(etapa)
        return Response(serializer_etapa.data, status=status.HTTP_200_OK)
    except Etapa.DoesNotExist:
        menssagem: str = f'Etapa com serial {serial_id} não encontrada'
        print(menssagem)
        return Response(
            {'error': menssagem},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print(f'Erro inesperado: {str(e)}')
        return Response(
            {'error': 'Ocorreu um erro interno'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_materiais(request: Request):
    try:
        materiais: QuerySet = Material.objects.all()
        etapas: QuerySet = Etapa.objects.all()
        serializer_materiais: MaterialSerializer = MaterialSerializer(materiais, many=True)
        serializer_etapas: EtapaSerializer = EtapaSerializer(etapas, many= True)  
        dados_combinados: dict ={
            'materiais': serializer_materiais.data,
            'etapas': serializer_etapas.data,
            'mensagem': 'Dados recuperados com sucesso!',
            'status': status.HTTP_200_OK
        }
        print(f'Dados recuperados com sucesso!')
        return Response(dados_combinados, status=status.HTTP_200_OK)
    except Exception as e:
        print(f'Erro ao recuperar materiais: {e}')   
        return Response(
            {'error': f'Erro ao buscar materiais: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
class ReportGenerator(Protocol):
    def generate(self, data: list[dict]) -> BytesIO:
        ...
class PDFReportGenerator:
    def generate(self, data: list[dict], title: str) -> BytesIO:
        buffer: BytesIO = BytesIO()
        pdf: Canvas = Canvas(buffer, pagesize=landscape(letter))
        
        pdf.setTitle(title)
        self._draw_header(pdf, title, len(data) - 1)
        
        table_data = self._prepare_table_data(data)
        print(f'Tipo table_data: {type(table_data)}')
        
        table: Table = Table(table_data)
        self._style_table(table)
        
        table.wrapOn(pdf, 700, 400)
        table.drawOn(pdf, 50, 450 - (len(table_data) * 15))
        
        pdf.showPage()
        pdf.save()
        buffer.seek(0)
        return buffer
    
    def _draw_header(self, pdf: Canvas, title: str, item_count: int):
        pdf.setFont("Helvetica-Bold", 16)
        pdf.drawString(50, 550, title)
        pdf.setFont("Helvetica", 12)
        pdf.drawString(50, 530, f"Data: {datetime.now().strftime('%d/%m/%Y %H:%M')}")
        pdf.drawString(50, 510, f"Total de itens: {item_count}")
    
    def _prepare_table_data(self, data: list[dict]) -> list[list[str]]:
        headers: list[str] = ["Serial", "Nome", "Tipo", "Validade", "Recebido", "Lavagem", "Esterilização", "Distribuição"]
        table_data: list[list[str]] = [headers]
        
        for item in data:
            table_data.append([
                item['serial'],
                item['nome'],
                item['tipo'],
                item['data'],
                str(item['quant_recebido']),
                str(item['quant_lavagem']),
                str(item['quant_esterilizacao']),
                str(item['quant_distribuicao'])
            ])
        return table_data
    
    def _style_table(self, table: Table):
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#FF6616')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.lightgrey),
            ('FONTSIZE', (0, 1), (-1, -1), 8),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.whitesmoke]),
        ]))

class ReportDataService:
    @staticmethod
    def get_complete_processing_data() -> list[dict]:
        etapas_completas: QuerySet = Etapa.objects.filter(
            quant_recebido__gt=0,
            quant_lavagem__gt=0,
            quant_esterilizacao__gt=0,
            quant_distribuicao__gt=0
        ).select_related('serial').order_by('serial__nome')
        
        return [
            {
                'serial': etapa.serial.serial,
                'nome': etapa.serial.nome,
                'tipo': etapa.serial.tipo,
                'data': etapa.serial.data.strftime('%d/%m/%Y'),
                'quant_recebido': etapa.quant_recebido,
                'quant_lavagem': etapa.quant_lavagem,
                'quant_esterilizacao': etapa.quant_esterilizacao,
                'quant_distribuicao': etapa.quant_distribuicao
            }
            for etapa in etapas_completas
        ]
    
class ExcelReportGenerator:
    def generate(self, data: list[dict], title: str) -> BytesIO:
        from openpyxl import Workbook
        
        output: BytesIO = BytesIO()
        workbook: Workbook = Workbook()
        sheet: Worksheet = workbook.active
        sheet.title = title[:31]
        
        sheet.page_setup.orientation = 'landscape'
        
        headers = ["Serial", "Nome", "Tipo", "Validade", "Recebido", "Lavagem", "Esterilização", "Distribuição"]
        sheet.append(headers)
        
        for item in data:
            sheet.append([
                item['serial'],
                item['nome'],
                item['tipo'],
                item['data'],
                item['quant_recebido'],
                item['quant_lavagem'],
                item['quant_esterilizacao'],
                item['quant_distribuicao']
            ])
        
        self._adjust_columns(sheet)
        self._center_content(sheet)
        
        workbook.save(output)
        output.seek(0)
        return output
    
    def _adjust_columns(self, sheet: Worksheet):
        for col in sheet.columns:
            max_length = max(len(str(cell.value)) for cell in col)
            adjusted_width = (max_length + 2) * 1.2
            sheet.column_dimensions[col[0].column_letter].width = adjusted_width
    
    def _center_content(self, sheet: Worksheet):
        for row in sheet.iter_rows():
            for cell in row:
                cell.alignment = Alignment(horizontal='center', vertical='center')
    
class ReportGeneratorFactory:
    @staticmethod
    def create_generator(format_type: str) -> ReportGenerator:
        if format_type == 'pdf':
            return PDFReportGenerator()
        if format_type == 'xlsx':
            return ExcelReportGenerator()
        raise ValueError("Formato não suportado")
    
@api_view(['GET'])
def gerar_relatorio(request: Request) -> Response:
    try:
        formato: str = request.query_params.get('formato', 'pdf').lower()
        data: list = ReportDataService.get_complete_processing_data()
        
        generator: PDFReportGenerator = ReportGeneratorFactory.create_generator(formato)
        report_buffer: BytesIO = generator.generate(data, "Relatório CME - Processamento Completo")
        
        content_type, file_extension = (
            ('application/pdf', 'pdf') if formato == 'pdf' 
            else ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx')
        )
        
        response = FileResponse(
            report_buffer,
            content_type=content_type,
            as_attachment=True,
            filename=f"relatorio_cme.{file_extension}"
        )
        return response
        
    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        print(f"Erro ao gerar relatório: {str(e)}")
        return Response({"error": f"Erro interno ao gerar relatório: {str(e)}"}, status=500)