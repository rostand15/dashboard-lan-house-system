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
- ✅ Cadastro de clientes
- ✅ Associação de clientes aos computadores
- ✅ Controle de computadores livres e em uso
- ✅ Remoção de clientes
- ✅ Persistência de dados utilizando LocalStorage
- ✅ Navegação entre páginas com React Router DOM

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

##  Clientes

Tela responsável pelo gerenciamento de clientes:

- listagem de clientes conectados
- computador utilizado por cada cliente
- remoção de clientes

---

##  Computadores

Tela que exibe todos os computadores cadastrados:

- status de livre ou em uso
- cliente conectado em cada máquina
- monitoramento dos computadores

---

## ⚙ Área Administrativa

Tela administrativa utilizada para:

- adicionar clientes
- associar clientes aos computadores
- gerenciamento geral do sistema

---

#  Organização das Pastas

```bash
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── Cards.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Clientes.jsx
│   ├── Computadores.jsx
│   └── Admin.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── data/
│   └── computadores.js
│
├── styles/
│   ├── dashboard.css
│   ├── sidebar.css
│   └── global.css
│
├── App.jsx
├── App.css
└── main.jsx