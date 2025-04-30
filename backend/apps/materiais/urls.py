from django.urls import path
from .views import criar_material, get_materiais, atualizar_etapa, gerar_relatorio

urlpatterns = [
    path('cadastrarmateriais/', criar_material, name= 'criar_material'),
    path('processamento/', get_materiais, name= 'get_materiais'),
    path('processamento/<str:serial_id>/', atualizar_etapa, name= 'atualizar_etapa'),
    path('processamento/relatorio/gerar/', gerar_relatorio, name= 'gerar_relatorio'),
]