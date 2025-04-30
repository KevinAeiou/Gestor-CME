Gestor-CME - Gerenciamento de Processos de CME
Sobre o Projeto
O Gestor-CME é uma aplicação web desenvolvida para gerenciar os processos essenciais de uma Central de Material e Esterilização (CME). O projeto utiliza tecnologias como JavaScript, Python e Docker para fornecer uma solução eficiente e escalável.

Configuração do Ambiente
Pré-requisitos
Docker (versão 20.10 ou superior)

Docker Compose (versão 1.29 ou superior)

Git (para clonar o repositório)

Instalação
Clone o repositório:

bash
git clone https://github.com/seu-usuario/Gestor-CME.git
cd Gestor-CME
Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto baseado no exemplo .env.example (se existir).

Preencha as variáveis necessárias, como credenciais de banco de dados e configurações da aplicação.

Construa e execute os containers com Docker Compose:

bash
docker-compose up -d --build
Isso irá construir as imagens e iniciar os serviços definidos no docker-compose.yml.

Acesse a aplicação:

A aplicação estará disponível em http://localhost:3000 (ou na porta configurada no Docker Compose).

Estrutura do Projeto
backend: Contém a lógica de back-end escrita em Python.

frontend: Contém a interface do usuário desenvolvida em JavaScript/HTML.

dockerignore e gitignore: Arquivos de configuração para ignorar arquivos desnecessários.

docker-compose.yml: Configuração dos serviços Docker para a aplicação.

Linguagens Utilizadas
JavaScript (60.4%)

Python (37.2%)

Dockerfile (1.6%)

HTML (0.9%)

Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

Faça um fork do projeto.

Crie uma branch para sua feature (git checkout -b feature/nova-feature).

Commit suas mudanças (git commit -m 'Adiciona nova feature').

Push para a branch (git push origin feature/nova-feature).

Abra um Pull Request.

Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

Contato
Para dúvidas ou sugestões, entre em contato através do repositório ou do e-mail do mantenedor.
