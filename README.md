Gestor-CME - Sistema de Gerenciamento para Central de Material e Esterilização

🚀 Visão Geral

O Gestor-CME é uma solução web completa desenvolvida para otimizar e modernizar os processos críticos de uma Central de Material e Esterilização (CME). Nossa plataforma integrada oferece:

 - Controle completo do fluxo de materiais esterilizados

 - Gestão de ciclos de esterilização

 - Rastreabilidade de instrumentais

 - Relatórios automatizados

 - Interface intuitiva para equipes técnicas

Tecnologias principais:

![JavaScript](https://img.shields.io/badge/JavaScript-60.4%25-yellow)
![Python](https://img.shields.io/badge/Python-37.2%25-blue)
![Docker](https://img.shields.io/badge/Docker-1.6%25-lightblue)
![HTML](https://img.shields.io/badge/HTML-0.8%25-orange)

🛠 Configuração do Ambiente

## Pré-requisitos

| Ferramenta       | Versão Mínima | Como Verificar         |
|------------------|---------------|------------------------|
| Docker           | 20.10+        | `docker --version`     |
| Docker Compose   | 1.29+         | `docker-compose --version` |
| Git              | Última        | `git --version`        |

⚙️ Instalação Passo a Passo

Clonar o repositório

bash
git clone https://github.com/seu-usuario/Gestor-CME.git
cd Gestor-CME
Configurar variáveis de ambiente

bash
cp .env.example .env
Edite o arquivo .env com:

ini
# Chave de segurança (gerar nova com:)
SECRET_KEY=$(python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")

# Configurações da API
REACT_APP_API_URL=http://backend:8000
DEBUG=True  # Desative em produção
Iniciar os containers

bash
docker-compose up -d --build
Configurar superusuário

bash
docker-compose exec backend sh -c "python manage.py createsuperuser"
Padrão de senha automática:
#<3PRIMEIRAS_LETRAS_DA_FUNCAO>-< NOME>

Exemplo:

Email: admin@cme.com
Nome: João Silva
Função: Administrador
Senha: #ADM-João
Acessar o sistema

Frontend: http://localhost:3000

Admin Django: http://localhost:8000/admin

📂 Estrutura do Projeto
Gestor-CME/

├── backend/               # API Django (Python)

│       ├── app/               # Aplicação principal

│       ├── manage.py          # Script de administração

│       └── requirements.txt   # Dependências Python

│

├── frontend/              # Aplicação React (JavaScript)

│       ├── public/            # Assets estáticos

│      └── src/               # Código-fonte

│
├── docker-compose.yml     # Orquestração de containers

├── .env                   # Variáveis de ambiente

└── README.md              # Documentação

🔧 Troubleshooting
Problema: Erro ao acessar o container
Solução: Use sh ao invés de bash:

bash
docker-compose exec backend sh
Problema: Portas já em uso
Solução: Altere as portas no .env:

ini
FRONTEND_PORT=3001
BACKEND_PORT=8001
🤝 Contribuição
Faça um fork do projeto

Crie uma branch (git checkout -b feature/nova-funcionalidade)

Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade')

Push para a branch (git push origin feature/nova-funcionalidade)

Abra um Pull Request

📞 Suporte
Para reportar problemas ou sugerir melhorias:
📧 kevin.souzaeiou@outlook.com
📌 Issues no GitHub

Nota: Garanta que o Docker Desktop esteja em execução antes de iniciar os containers. Para ambientes de produção, configure adequadamente as variáveis de segurança e desative o modo DEBUG.