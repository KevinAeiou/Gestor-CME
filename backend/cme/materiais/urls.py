from django.urls import path
from .views import criar_material, get_materiais, atualizar_etapa, gerar_relatorio, deletar_material

urlpatterns = [
    path('cadastrarmateriais/', criar_material, name= 'criar_material'),
    path('processamento/deletar/<str:serial_id>/', deletar_material, name= 'deletar_material'),
    path('processamento/', get_materiais, name= 'get_materiais'),
    path('processamento/alterar/<str:serial_id>/', atualizar_etapa, name= 'atualizar_etapa'),
    path('processamento/relatorio/gerar/', gerar_relatorio, name= 'gerar_relatorio'),
]