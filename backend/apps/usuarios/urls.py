from django.urls import path
from .views import criar_usuario, autenticar_usuario, sair_usuario, usuario_atual

urlpatterns = [
    path('cadastrarusuario/', criar_usuario, name= 'criar_usuario'),
    path('entrar/', autenticar_usuario, name= 'autenticar_usuario'),
    path('sair/', sair_usuario, name= 'sair_usuario'),
    path('usuario-atual/', usuario_atual, name= 'usuario_atual'),
]