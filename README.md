# API de Gerenciamento de Documentos Jurídicos

## Descrição

API para gerenciamento de documentos jurídicos, com autenticação de usuários com senha e autorização utilizando JWT. Cada usuário e documento cadastrado possui um nível de acesso de 1 a 4, sendo que cada usuário pode acessar documentos com nível de acesso igual ou inferior ao dele. Além disso, cada usuário passa por um processo de autenticação e autorização por token JWT para conseguir acessar as rotas de manipulação de documentos no banco de dados MongoDB, com o token possuindo 1 hora de validade. A aplicação aceita criação, atualização e exclusão de documentos no formato PDF ou DOCX, e é capaz de retornar os documentos requisitados ao banco de dados em formato PDF para o cliente, sendo armazenados na pasta [output-documents/](output-documents).

<br>

## Principais tecnologias
- NodeJS com o framework Express
- Jest para testes unitários
- Biblioteca "natural" para processamento de linguagem natural

<br>

## Executando a aplicação
1- No diretório [backend/](backend/), execute o comando:
```bash
$ npm install
```

2- No diretório [backend/](backend/), crie um arquivo .env com as seguintes configurações:
```
DB_CONNECTION_STRING={mongodb+srv://}
SECRET_KEY={example}
```
Obs: "DB_CONNECTION_STRING" deve ser a URI do MongoDB, e SECRET_KEY é a chave secreta usada para autenticação JWT.

3- Ainda no diretório [backend/](backend/), execute o comando:
```bash
$ npm start
```

<br>

## API Endpoints - Users
`GET` /users
**Descrição:**
- Faz uma requisição para o banco de dados MongoDB e retorna todos os usuários com os seguintes campos:
```json
{
  _id,
  username,
  email
  accessLevel
}
```

`GET` /users/user
**Descrição:**
- Faz uma requisição para o banco de dados MongoDB e retorna um único usuário que seja compatível com o email fornecido, com os seguintes campos:
```json
{
  _id,
  username,
  email
  accessLevel
}
```

`POST` /users
**Descrição:**
- Cadastra um novo usuário
**Parâmetros de Corpo (Body):**
```json
{
  "username": "string", // Deve ser uma string não vazia
  "email": "string", // Deve ser uma string não vazia do tipo email
  "password": "string", // Deve ser uma string não vazia com tamanho mínimo de 7 caracteres
  "accessLevel": "number" // Deve ser um número de 1 a 4, default = 1
}
```

`PATCH` /users
**Descrição:**
- Possibilita a edição de senha do usuário:
**Parâmetros de Corpo (Body):**
```json
{
  "email": "string", // Deve ser uma string não vazia do tipo email
  "password": "string", // Deve ser uma string não vazia com tamanho mínimo de 7 caracteres
}
```

`DELETE` /users
**Descrição:**
- Possibilita a deleção do usuário:
**Parâmetros de Corpo (Body):**
```json
{
  "email": "string", // Deve ser uma string não vazia do tipo email
}
```

## API Endpoints - Auth
`GET` /sign-in
- Realização de autenticação pelo usuário, sendo retornado um token com 1 hora de tempo para expirar
**Parâmetros de Corpo (Body):**
```json
{
  "email": "string", // Deve ser uma string não vazia do tipo email
  "password": "string", // Deve ser uma string não vazia com tamanho mínimo de 7 caracteres
}
```

## API Endpoints - Documents
OBS: Para conseguir realizar requisições em qualquer rota "/documents", o usuário precisará antes realizar a autenticação na rota "/sign-in" e colar o token fornecido no campo "Authorization" do headers das rotas /documents.

`GET` /documents
- Recupera e converte em pdf todos os documentos do banco de dados MongoDB

`GET` /documents/filename
- Recupera e converte em pdf um único documento do banco de dados MongoDB que apresente o mesmo "filename" fornecido
**Parâmetros de Corpo (Body):**
```json
{
  "filename": "string"
}
```

`GET` /documents/date
- Recupera e converte em pdf todos os documentos que foram criados no banco de dados entre as datas fornecidas
**Parâmetros de Corpo (Body):**
```json
{
  "firstDate": "string", // formato AAAA-MM-DD
  "secondDate": "string" // formato AAAA-MM-DD
}
```

`GET` /documents/word
- Recupera e converte em pdf todos os documentos do banco de dados que contenham em seu texto a palavra chave fornecida
**Parâmetros de Corpo (Body):**
```json
{
  "keyword": "string"
}
```

`POST` /documents
- Cria um novo documento no banco de dados MongoDB
**Parâmetros de Corpo (Body):**
```json
{
  "file": "multipart/form-data",
  "filename": "string",
  "accessLevel": "number" // Deve ser de 1 a 4, default = 1
}
```

`DELETE` /documents/:id
- Deleta um documento no banco de dados MongoDB que contenha o id fornecido como parâmetro

`PUT` /documents/:id
- Edita um documento no banco de dados MongoDB que contenha o id fornecido como parâmetro
**Parâmetros de Corpo (Body):**
```json
{
  "file": "multipart/form-data",
  "filename": "string",
  "accessLevel": "number" // Deve ser de 1 a 4, default = 1
}
```
