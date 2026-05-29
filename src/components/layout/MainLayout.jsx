import { useState } from "react";
import { NavLink } from "react-router-dom";

import Modal from "../ui/Modal";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

export default function MainLayout({ children }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const navStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#2563eb" : "#111",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "250px",
          background: "#fff",
          borderRight: "1px solid #e2e8f0",
          padding: "25px",
        }}
      >
        <h2 style={{ color: "#2563eb", marginBottom: "40px" }}>
          Campina Pulse
        </h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <NavLink to="/" style={navStyle}>Home</NavLink>
          <NavLink to="/events" style={navStyle}>Eventos</NavLink>
          <NavLink to="/alerts" style={navStyle}>Alertas</NavLink>

          <span
            onClick={() => setOpenLogin(true)}
            style={{ cursor: "pointer", color: "#111" }}
          >
            Login
          </span>

          <span
            onClick={() => setOpenRegister(true)}
            style={{ cursor: "pointer", color: "#111" }}
          >
            Register
          </span>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: "70px",
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
          }}
        >
          <h3>Painel Inteligente</h3>
          <span>Administrador</span>
        </header>

        <main style={{ padding: "30px" }}>
          {children}
        </main>
      </div>

      {/* MODALS */}
      <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
        <LoginForm />
      </Modal>

      <Modal isOpen={openRegister} onClose={() => setOpenRegister(false)}>
        <RegisterForm />
      </Modal>
    </div>
  );
}