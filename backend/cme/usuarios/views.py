from django.contrib.auth import logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .serializers import UsuarioSerializer, AutenticaSerializer
from .models import Usuario

@api_view(['POST'])
def criar_usuario(request: Response) -> Response:
    serializer: UsuarioSerializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def autenticar_usuario(request: Response):
    serializer = AutenticaSerializer(data = request.data, context= {'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    usuario: Usuario = serializer.validated_data['user']
    refresh = RefreshToken.for_user(usuario)
    
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user_funcao': usuario.funcao,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sair_usuario(request: Response):
    logout(request)
    return Response({'message': 'Logout realizado com sucesso'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_atual(request: Response):
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)