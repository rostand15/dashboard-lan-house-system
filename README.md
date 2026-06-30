# Dashboard Lan House System

Sistema de gerenciamento para uma lan house, desenvolvido com React, Node.js, Express e MongoDB.

O projeto permite controlar máquinas, clientes, produtos alimentícios, estoque e vendas, simulando o funcionamento administrativo de uma lan house moderna.

---

## Integrantes do Grupo

- Rostand Araújo
- Anibal Neto
- Samuel Batista

---

# Descrição do Sistema

O **Dashboard Lan House System** é uma aplicação web criada para auxiliar no gerenciamento de uma lan house.

Inicialmente, o projeto foi desenvolvido apenas com frontend em React, utilizando `LocalStorage` para armazenar os dados. Nas atualizações mais recentes, foi adicionada uma estrutura de backend com Node.js, Express, MongoDB e Mongoose, permitindo salvar produtos alimentícios e vendas em banco de dados.

O sistema possui uma interface moderna, com sidebar lateral retrátil, telas separadas por funcionalidade, controle de máquinas, cadastro de produtos alimentícios, controle de estoque e registro de vendas.

---

# Funcionalidades do Sistema

- Login com validação de campos obrigatórios;
- Dashboard com informações gerais do sistema;
- Controle de máquinas livres, em uso e em manutenção;
- Associação de clientes às máquinas;
- Cadastro e gerenciamento de produtos alimentícios;
- Busca de produtos alimentícios;
- Filtros por categoria;
- Controle de estoque;
- Registro de vendas;
- Cálculo automático do valor total vendido;
- Baixa automática do estoque ao registrar uma venda;
- Histórico de vendas;
- Persistência de alimentos e vendas com MongoDB;
- Navegação entre páginas com React Router DOM;
- Sidebar lateral retrátil;
- Interface responsiva;
- Modais para cadastro e edição;
- Layout moderno com CSS.

---

# Tecnologias Utilizadas

## Frontend

- React
- JavaScript
- Vite
- React Router DOM
- CSS3

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- Nodemon
- Dotenv

---

# Telas Desenvolvidas

## Login

Tela inicial do sistema contendo:

- campos de e-mail e senha;
- validação obrigatória dos campos;
- redirecionamento para o dashboard.

> Observação: o login é simples e não depende de autenticação real no banco de dados.

---

## Dashboard

Tela principal do sistema, responsável por exibir informações gerais da lan house, como:

- máquinas em uso;
- máquinas livres;
- clientes conectados;
- informações resumidas do sistema.

---

## Máquinas

Tela responsável pelo controle das máquinas da lan house.

Funcionalidades:

- listagem das máquinas;
- alteração de status;
- identificação de máquina livre, em uso ou em manutenção;
- associação de cliente à máquina;
- liberação de máquina;
- edição de informações;
- remoção de máquinas.

---

## Produtos Alimentícios

Tela responsável pelo gerenciamento dos produtos vendidos na lan house.

Funcionalidades:

- cadastro de produtos;
- edição de produtos;
- remoção de produtos;
- busca por nome;
- filtro por categoria;
- controle de estoque;
- botão para vender produto;
- baixa automática do estoque;
- integração com o backend e MongoDB.

Categorias disponíveis:

- Alimentos
- Bebidas
- Doces
- Salgados
- Outros

---

## Registro de Vendas

Tela responsável pelo registro e acompanhamento das vendas de produtos alimentícios.

Funcionalidades:

- seleção de produto cadastrado;
- informação da quantidade vendida;
- escolha da forma de pagamento;
- cálculo automático do valor total;
- registro da venda no MongoDB;
- baixa automática do estoque;
- histórico de vendas;
- total vendido;
- total de itens vendidos;
- quantidade de produtos cadastrados.

---

# Fluxo de Funcionamento de Alimentos e Vendas

O fluxo correto do sistema é:

```txt
Cadastrar produto na aba Produtos Alimentícios
↓
Produto é salvo no MongoDB
↓
Produto aparece na tela Registro de Vendas
↓
Usuário seleciona o produto e informa a quantidade
↓
Sistema calcula o valor total da venda
↓
Venda é salva no MongoDB
↓
Estoque do produto é reduzido automaticamente

# Passo a Passo para Instalar e Executar o Projeto

Este projeto possui três partes principais:

1. MongoDB — banco de dados;
2. Backend — servidor Node.js com Express;
3. Frontend — interface React com Vite.


Para executar o sistema corretamente, é necessário iniciar essas três partes.

---

## 1. Clonar o Repositório

Abra o terminal na pasta onde deseja salvar o projeto e execute:

```bash
git clone https://github.com/rostand15/dashboard-lan-house-system.git
```

Depois entre na pasta do projeto:

```bash
cd dashboard-lan-house-system
```

Caso o projeto tenha sido clonado dentro de uma segunda pasta com o mesmo nome, execute novamente:

```bash
cd dashboard-lan-house-system
```

---

## 2. Instalar e Executar o MongoDB

O projeto utiliza MongoDB localmente, com a seguinte conexão:

```txt
mongodb://127.0.0.1:27017/lanhouse
```

O banco de dados utilizado se chama:

```txt
lanhouse
```

Caso o MongoDB esteja instalado como serviço no Windows, ele pode iniciar automaticamente.

Para verificar se o MongoDB está instalado, execute no terminal:

```bash
mongod --version
```

ou:

```bash
mongosh
```

Se o comando `mongod` não for reconhecido, abra a pasta `bin` do MongoDB e execute o MongoDB manualmente.

Primeiro, crie a pasta onde o banco irá armazenar os dados:

```bash
mkdir C:\data\db
```

Depois, dentro da pasta `bin` do MongoDB, execute:

```bash
.\mongod --dbpath C:\data\db
```

Esse terminal deve permanecer aberto enquanto o sistema estiver rodando.

---

## 3. Instalar e Executar o Backend

Abra um novo terminal no VS Code.

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências do backend:

```bash
npm install
```

Execute o backend:

```bash
npm run dev
```

Se estiver funcionando corretamente, o terminal deverá mostrar uma mensagem parecida com:

```txt
MongoDB conectado 🚀
Servidor rodando na porta 3001
```

O backend estará disponível em:

```txt
http://localhost:3001
```

Para testar se o backend está funcionando, abra no navegador:

```txt
http://localhost:3001/
```

Deve aparecer a mensagem:

```txt
API da Lan House rodando
```

Também é possível testar as rotas:

```txt
http://localhost:3001/alimentos
```

```txt
http://localhost:3001/vendas
```

Se aparecer `[]`, significa que a rota está funcionando, mas ainda não existem dados cadastrados.

---

## 4. Instalar e Executar o Frontend

Abra outro terminal no VS Code.

Se estiver dentro da pasta `backend`, volte para a pasta principal do projeto:

```bash
cd ..
```

Instale as dependências do frontend:

```bash
npm install
```

Execute o frontend:

```bash
npm run dev
```

O terminal mostrará um endereço parecido com:

```txt
http://localhost:5173
```

ou:

```txt
http://localhost:5174
```

Abra esse endereço no navegador para acessar o sistema.

---

# Resumo dos Comandos

## Clonar o Projeto

```bash
git clone https://github.com/rostand15/dashboard-lan-house-system.git
cd dashboard-lan-house-system
```

Caso exista uma pasta interna com o mesmo nome:

```bash
cd dashboard-lan-house-system
```

---

## Terminal 1 — MongoDB

Caso o MongoDB não esteja rodando automaticamente:

```bash
mkdir C:\data\db
.\mongod --dbpath C:\data\db
```

---

## Terminal 2 — Backend

```bash
cd backend
npm install
npm run dev
```

---

## Terminal 3 — Frontend

```bash
cd ..
npm install
npm run dev
```

---

# Ordem Correta de Execução

```txt
1. Iniciar o MongoDB
2. Iniciar o backend
3. Iniciar o frontend
4. Abrir o sistema no navegador
```

---

# Endereços do Sistema

## Backend

```txt
http://localhost:3001
```

## Frontend

```txt
http://localhost:5173
```

ou:

```txt
http://localhost:5174
```

## Rotas para Testar o Backend

```txt
http://localhost:3001/alimentos
```

```txt
http://localhost:3001/vendas
```

---

# Como Confirmar se Está Funcionando

O projeto estará funcionando corretamente quando:

- o MongoDB estiver rodando;
- o backend mostrar a mensagem `MongoDB conectado`;
- o backend estiver disponível em `http://localhost:3001`;
- o frontend estiver disponível em `http://localhost:5173` ou `http://localhost:5174`;
- a rota `http://localhost:3001/alimentos` abrir no navegador;
- a rota `http://localhost:3001/vendas` abrir no navegador.

---

# Como Confirmar se os Dados Foram Salvos no Banco

Depois de cadastrar um produto alimentício pelo sistema, acesse:

```txt
http://localhost:3001/alimentos
```

Se o produto aparecer com o campo `_id`, significa que ele foi salvo no MongoDB.

Depois de registrar uma venda, acesse:

```txt
http://localhost:3001/vendas
```

Se a venda aparecer com os campos `_id`, `nomeProduto`, `quantidade`, `valorUnitario` e `valorTotal`, significa que ela foi salva corretamente no banco de dados.