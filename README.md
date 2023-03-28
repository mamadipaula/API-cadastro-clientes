# API-cadastro-clientes
# Como rodar o projeto:

1. Clonar o repositório
2. Abrir um terminal
3. Rodar o comando "yarn" para instalar as dependências;
4. Criar um arquivo .env dentro desse repositorio a partir de uma cópia do .env.example, e preencher as chaves com as configurações da sua maquina.
5. Rodar o comando "yarn typeorm migration:run -d src/data-source.ts" para criar as tabelas e banco de dados (cria automaticamente um arquivo de nome db.sqlite3)
6. Rodar o comando "yarn dev" pra subir o servidor localmente da API. O servidor vai estar na rota http://localhost:3001 e voce verá no terminal a mensagem "Servidor executando na porta http://localhost:3001"
