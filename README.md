#  Dashboard Lan House System

##  Integrantes do Grupo

- Seu nome
- Rostand Araújo
- Anibal Neto
- Samuel Batista

---

#  Descrição do Sistema

O projeto consiste em um sistema de gerenciamento para uma lan house, desenvolvido em React.

O sistema permite controlar:
- clientes conectados
- computadores em uso
- cadastro de produtos
- gerenciamento básico da lan house

A aplicação simula o funcionamento de um sistema administrativo antes da integração com backend.

---

#  Tecnologias Utilizadas

- React
- JavaScript
- React Router DOM
- CSS
- Vite
- LocalStorage

---

# 📱 Telas Desenvolvidas

##  Login
Tela inicial do sistema com validação obrigatória dos campos de email e senha.

---

##  Dashboard
Tela principal contendo:
- quantidade de clientes conectados
- computadores em uso
- computadores livres
- produtos cadastrados

---

##  Clientes
Tela responsável por listar:
- clientes conectados
- computador utilizado
- remoção de clientes

---

##  Computadores
Tela que mostra:
- todos os computadores cadastrados
- status de livre ou em uso
- cliente conectado em cada computador

---

##  Produtos
Tela responsável pela listagem de produtos cadastrados e remoção de produtos.

---

##  Área Administrativa
Tela utilizada para:
- adicionar produtos
- adicionar clientes
- associar clientes aos computadores

---

#  Organização das Pastas

```bash
src/
├── components/
│   └── Navbar.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Clientes.jsx
│   ├── Computadores.jsx
│   ├── Produtos.jsx
│   └── Admin.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── data/
│   └── computadores.js
│
├── App.jsx
├── App.css
└── main.jsx
```

---

# ▶ Como Rodar o Projeto

## Instalar dependências

```bash
npm install
```

## Iniciar o projeto

```bash
npm run dev
```

Após iniciar, abrir o link exibido no terminal no navegador.