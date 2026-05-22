# Dashboard Lan House System

## Integrantes do Grupo
- Rostand Araújo
- Anibal Neto
- Samuel Batista

---

# Descrição do Sistema

O projeto consiste em um sistema de gerenciamento para uma lan house, desenvolvido utilizando React.

O sistema permite realizar o controle de clientes, máquinas e produtos alimentícios, simulando o funcionamento administrativo de uma lan house moderna.

A aplicação foi criada inicialmente apenas no frontend, utilizando armazenamento local com LocalStorage para persistência dos dados.

---

# Funcionalidades do Sistema

- ✅ Login com validação de email e senha
- ✅ Dashboard com informações em tempo real
- ✅ Controle de máquinas livres e em uso
- ✅ Persistência de dados utilizando LocalStorage
- ✅ Navegação entre páginas com React Router DOM
- ✅ Cadastro e gerenciamento de produtos alimentícios
- ✅ Busca e filtro de produtos alimentícios
- ✅ Controle de estoque
- ✅ Venda de produtos com baixa automática no estoque
- ✅ Sidebar retrátil
- ✅ Interface responsiva
- ✅ Modais para edição de dados
- ✅ Filtros por categoria e status

---

# Tecnologias Utilizadas

- React
- JavaScript
- Vite
- React Router DOM
- CSS3
- LocalStorage

---

# Telas Desenvolvidas

## Login

Tela inicial do sistema contendo:

- validação obrigatória dos campos
- autenticação simples
- acesso ao sistema

---

## Dashboard

Tela principal contendo indicadores gerais da lan house:

- quantidade de clientes conectados
- máquinas em uso
- máquinas livres

---

## Máquinas

Tela que exibe todas as máquinas cadastradas:

- status de livre ou em uso
- cliente conectado em cada máquina
- monitoramento das máquinas
- edição de informações
- alteração de status
- remoção de máquinas

---

## Produtos Alimentícios

Tela responsável pelo gerenciamento dos produtos da lan house:

- cadastro de produtos
- gerenciamento de estoque
- busca de produtos
- filtros por categoria
- venda de produtos
- baixa automática no estoque
- edição e exclusão de produtos

Categorias disponíveis:
- Alimentos
- Bebidas
- Doces
- Salgados

---

# Organização das Pastas

```bash
src/
├── assets/
│
├── components/
│   └── Navbar.jsx
│
├── data/
│   └── computadores.js
│
├── pages/
│   ├── Admin.jsx
│   ├── Alimentos.css
│   ├── Alimentos.jsx
│   ├── Clientes.jsx
│   ├── Computadores.css
│   ├── Computadores.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Produtos.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── styles/
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx

.gitignore
eslint.config.js
index.html
package-lock.json
package.json
README.md
vite.config.js
```

---

# Atualizações Recentes

- ✅ Correção dos textos na aba de computadores
- ✅ Alteração da nomenclatura de “Computadores” para “Máquinas”
- ✅ Melhorias visuais gerais utilizando CSS
- ✅ Ajustes de responsividade
- ✅ Melhor organização dos elementos da interface
- ✅ Correções de alinhamento da sidebar
- ✅ Sidebar retrátil implementada
- ✅ Ajustes nos botões e filtros da aba de alimentos
- ✅ Correção de cores e contraste dos textos
- ✅ Correção do tamanho do botão “Adicionar Produto”
- ✅ Melhor experiência visual para navegação do usuário
- ✅ Refatoração do App.css
- ✅ Melhor organização dos componentes

---

#  Como Rodar o Projeto

##  Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

##  Entrar na Pasta do Projeto

```bash
cd lan-house-system
```

---

##  Atualizar para a Última Versão do Projeto

```bash
git pull origin main
```

---

##  Instalar as Dependências

```bash
npm install
```

---

## 5 Rodar o Projeto

```bash
npm run dev
```

---

## 6️ Abrir no Navegador

Após executar o projeto, o terminal mostrará um endereço semelhante a este:

```bash
http://localhost:5173
```

Abra o link no navegador para visualizar o sistema funcionando.

---

#  Estrutura Visual do Sistema

O sistema possui:

- layout moderno
- sidebar lateral retrátil
- design responsivo
- cards organizados
- modais estilizados
- filtros dinâmicos
- interface otimizada para melhor experiência do usuário





