from rest_framework import serializers
from .models import Usuario
from django.utils.translation import gettext_lazy as _
from .models import Usuario, FuncaoUsuario

class UsuarioSerializer(serializers.ModelSerializer):
    funcao = serializers.ChoiceField(choices=FuncaoUsuario.choices)

    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'funcao']
        extra_kwargs = {
            'senha_hash': {'write_only': True, 'required': False}
        }

    def create(self, dado_valido):
        return Usuario.objects.create_user(**dado_valido)
    
class AutenticaSerializer(serializers.Serializer):
    email = serializers.EmailField()
    senha = serializers.CharField(write_only = True, style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, data):
        email = data.get('email')
        senha = data.get('senha')

        if email and senha:
            try:
                usuario = Usuario.objects.get(email= email)
                if not usuario.check_password(senha):
                    raise serializers.ValidationError(
                        {'non_field_errors': ['Credenciais inválidas']},
                        code='authorization'
                    )
            except Usuario.DoesNotExist:
                raise serializers.ValidationError(
                    {'non_field_errors': ['Credenciais inválidas']},
                    code='authorization'
                )
        else:
            msg = _('Deve incluir "email" e "password".')
            raise serializers.ValidationError(msg, code='authorization')

        data['user'] = usuario
        return data