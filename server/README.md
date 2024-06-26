# Nutri-App Server

### Criando um projeto igual: 
Realizar os passos abaixo: 
~~~ bash
npm init -y
~~~
Criar na pasta de projetos, na raiz, os arquivos: index.js, config.js, .env, .gitignore

#### Bibliotecas instaladas: 
~~~ bash
npm install express dotenv cors body-parser pg
# Node monitor
npm install --save-dev nodemon
~~~

Para utilizar o nodemon em localhost, deve-se adicionar a package.json o seguinte script: 
~~~ json
"scripts": {
    ...
    "start": "nodemon index.js"
},
~~~

#### Arquivo dotenv e .gitignore
Criar o arquivo .env com as configurações de porta
~~~ bash
# Configurações para o express local
PORT=9082
# Configurações para o postgreeSQL remoto
pgConnection = "<urlConexao>"
~~~
Criar o arquivo .gitignore com as configurações o que ignorar ao levar para o GitHub
~~~ 
.env
node_modules
~~~

#### Deixar o servidor online localmente: 
~~~ bash
npm start
~~~

#### Deixar o servidor online na Vercel: 
Adicionar o arquivo vercel.json a raiz do projeto, com o seguinte conteúdo: 
~~~ json
{
    "version": 2,
    "builds": [
        {
            "src": "index.js",
            "use": "@now/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "index.js"
        }
    ]
}
~~~

Adicionar as variáveis de ambiente quando criar um projeto na Vercel: 
NAME: pgConnection
VALUE: <URL-da-conexao-com-o-banco-de-dados>