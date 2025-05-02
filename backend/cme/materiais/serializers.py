from rest_framework import serializers
from .models import Material, EtapaMaterial, Etapa

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['serial', 'nome', 'tipo', 'data']
        extra_kwargs = {
            'serial': {'required': False}
        }

class EtapaSerializer(serializers.ModelSerializer):
    etapa = serializers.ChoiceField(
        choices = EtapaMaterial.choices,
        default = EtapaMaterial.RECEBIMENTO,
        required = False
    )
    serial = serializers.SlugRelatedField(
        slug_field = 'serial',
        queryset = Material.objects.all()
    )

    class Meta:
        model = Etapa
        fields = [
            'serial',
            'etapa', 
            'quant_recebido', 
            'quant_lavagem', 
            'quant_esterilizacao', 
            'quant_distribuicao'
        ]
        extra_kwargs = {
            'quant_recebido': {'required': False, 'default': 1},
            'quant_lavagem': {'required': False, 'default': 0},
            'quant_esterilizacao': {'required': False, 'default': 0},
            'quant_distribuicao': {'required': False, 'default': 0}
        }