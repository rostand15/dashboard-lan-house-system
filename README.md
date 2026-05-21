#  Dashboard Lan House System

##  Integrantes do Grupo
- Rostand Araújo
- Anibal Neto
- Samuel Batista

---

#  Descrição do Sistema

O projeto consiste em um sistema de gerenciamento para uma lan house, desenvolvido utilizando React.

O sistema permite realizar o controle de clientes e computadores, simulando o funcionamento administrativo de uma lan house moderna.

A aplicação foi criada inicialmente apenas no frontend, utilizando armazenamento local com LocalStorage para persistência dos dados.

---

#  Funcionalidades do Sistema

- ✅ Login com validação de email e senha
- ✅ Dashboard com informações em tempo real
- ✅ Controle de computadores livres e em uso
- ✅ Persistência de dados utilizando LocalStorage
- ✅ Navegação entre páginas com React Router DOM
- ✅ Cadastro e gerenciamento de produtos alimentícios
- ✅ Busca e filtro de produtos alimentícios
- ✅ Controle de estoque
- ✅ Venda de produtos com baixa automática no estoque

---

# 🛠 Tecnologias Utilizadas

- React
- JavaScript
- Vite
- React Router DOM
- CSS
- LocalStorage

---

#  Telas Desenvolvidas

##  Login

Tela inicial do sistema contendo:
- validação obrigatória dos campos
- autenticação simples
- acesso ao sistema

---

##  Dashboard

Tela principal contendo indicadores gerais da lan house:

- quantidade de clientes conectados
- computadores em uso
- computadores livres

---

##  Computadores

Tela que exibe todos os computadores cadastrados:

- status de livre ou em uso
- cliente conectado em cada máquina
- monitoramento dos computadores

---

### Produtos Alimentícios

- Cadastro e gerenciamento de produtos alimentícios
- Controle de estoque dos produtos alimentícios
- Venda de produtos com baixa automática no estoque

## 📁 Organização das Pastas

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
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```