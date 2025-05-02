from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import hashlib
from django.utils import timezone

class FuncaoUsuario(models.TextChoices):
    ADMINISTRADOR = 'Administrador', 'Administrador'
    TECNICO = 'Técnico', 'Tecnico'
    ENFERMAGEM = 'Enfermagem', 'Enfermagem'

class UsuarioManager(BaseUserManager):
    def create_user(self, email, nome, funcao, **extra_fields):
        if not email:
            raise ValueError('O email deve ser fornecido')
        email = self.normalize_email(email)

        abreviacao = self._get_abreviacao_funcao(funcao)
        senha_hash = self._gerar_senha_hash(nome, abreviacao)

        usuario: Usuario = self.model(
            nome=nome,
            email=email,
            funcao=funcao,
            last_login=timezone.now(),
            **extra_fields
        )
        usuario.senha_hash = senha_hash
        usuario.save(using=self._db)
        return usuario
    
    def create_superuser(self, email, nome, funcao, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superusuário deve ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superusuário deve ter is_superuser=True.')

        if funcao != FuncaoUsuario.ADMINISTRADOR:
            funcao = FuncaoUsuario.ADMINISTRADOR

        return self.create_user(
            email=email,
            nome=nome,
            funcao=funcao,
            **extra_fields
        )

    @staticmethod
    def _get_abreviacao_funcao(funcao):
        if funcao == FuncaoUsuario.ADMINISTRADOR:
            return 'ADM'
        if funcao == FuncaoUsuario.TECNICO:
            return 'TEC'
        if funcao == FuncaoUsuario.ENFERMAGEM:
            return 'ENF'
        return 'USR'
    
    def _gerar_senha_hash(self, nome, abreviacao):
        senha_plana = f"#{abreviacao}-{nome}"
        senha_hash = hashlib.sha256(senha_plana.encode()).hexdigest()
        return senha_hash
    

class Usuario(AbstractBaseUser, PermissionsMixin):
    nome = models.CharField(max_length= 100, null= False, blank= False)
    email = models.EmailField(unique= True, null= False, blank= False)
    funcao = models.CharField(
        max_length= 15, 
        choices= FuncaoUsuario.choices, 
        default=FuncaoUsuario.TECNICO, 
        null= False, 
        blank= False)
    last_login = models.DateTimeField(null=True, blank=True)
    senha_hash = models.TextField(null= False, blank= False)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'funcao']

    class Meta:
        db_table= 'usuarios_usuario'

    def set_password(self, raw_password):
        pass

    def check_password(self, raw_password):
        senha_hash_input = hashlib.sha256(raw_password.encode()).hexdigest()
        return self.senha_hash == senha_hash_input
    
    @property
    def password(self):
        return self.senha_hash

    @password.setter
    def password(self, raw_password):
        pass

    def __str__(self):
        return f'Usuário [{self.nome} | {self.email} | {self.funcao}]'