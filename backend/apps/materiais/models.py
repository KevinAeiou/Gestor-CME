from django.db import models
from django.db.models.signals import pre_save
import uuid

class EtapaMaterial(models.TextChoices):
    RECEBIMENTO = 'Recebimento', 'Recebimento'
    LAVAGEM = 'Lavagem', 'Lavagem'
    ESTERILIZACAO = 'Esterelização', 'Esterelizacao'
    DISTRIBUICAO = 'Distribuição', 'Distribuicao'


class Material(models.Model):
    serial = models.CharField(unique= True, max_length= 70, null= False, blank= False)
    nome = models.CharField(max_length= 100, null= False, blank= False)
    tipo = models.CharField(max_length= 70, null= False, blank= False)
    data = models.DateField(max_length= 70, null= False, blank= False)

    def __str__(self):
        return f'Material [{self.nome}]'

class Etapa(models.Model):
    serial = models.ForeignKey(
        Material,
        to_field= 'serial',
        on_delete= models.CASCADE,
        null= False,
        blank= False
    )
    etapa = models.CharField(choices= EtapaMaterial.choices, default= EtapaMaterial.RECEBIMENTO, null= False, blank= False)
    quant_recebido = models.IntegerField(default=0, null=False,blank=False)
    quant_lavagem = models.IntegerField(default=0, null=False,blank=False)
    quant_esterilizacao = models.IntegerField(default=0, null=False,blank=False)
    quant_distribuicao = models.IntegerField(default=0, null=False,blank=False)

    def __str__(self):
        return f'{self.etapa}, {int(self.quant_recebido)}, {int(self.quant_lavagem)}, {int(self.quant_esterilizacao)}, {int(self.quant_distribuicao)}'

SIGLAS_TIPOS = {
    'tesoura cirúrgica': 'SC',
    'tesoura': 'SC',
    'surgical scissors': 'SC',
    'hemostato': 'HEM',
    'hemostatic clamp': 'HEM',
    'pinça': 'PIN',
    'forceps': 'PIN',
    'bisturi': 'BIS',
    'scalpel': 'BIS',
}

def gerar_serial(sender, instance: Material, **kwargs):
    if not instance.serial:
        tipo_normalizado: str = instance.tipo.lower().strip()
        sigla: str = SIGLAS_TIPOS.get(tipo_normalizado, instance.tipo[:3].upper())
        
        numero_unico: str = str(uuid.uuid4().fields[-1])[:3]
        
        instance.serial = f"CME-{sigla}-{numero_unico.zfill(3)}"

pre_save.connect(gerar_serial, sender=Material)
