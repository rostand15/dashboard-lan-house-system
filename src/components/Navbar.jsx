import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [retraido, setRetraido] = useState(true);
  const location = useLocation();

  return (
    <aside className={retraido ? "sidebar retraido" : "sidebar"}>
      <div className="sidebar-header">
        <button
          className="toggle-btn"
          onClick={() => setRetraido(!retraido)}
        >
          ☰
        </button>

        {!retraido && <h2 className="sidebar-title">Lan House</h2>}
      </div>

      <ul className="sidebar-menu">
        <li className={location.pathname === "/dashboard" ? "ativo" : ""}>
          <Link to="/dashboard">
            <span>🏠</span>
            {!retraido && <span>Dashboard</span>}
          </Link>
        </li>

        <li className={location.pathname === "/computadores" ? "ativo" : ""}>
          <Link to="/computadores">
            <span>💻</span>
            {!retraido && <span>Máquinas</span>}
          </Link>
        </li>

        <li className={location.pathname === "/alimentos" ? "ativo" : ""}>
          <Link to="/alimentos">
            <span>🍔</span>
            {!retraido && <span>Alimentos</span>}
          </Link>
        </li>

        <li className={location.pathname === "/vendas" ? "ativo" : ""}>
          <Link to="/vendas">
            <span>🧾</span>
            {!retraido && <span>Vendas</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Navbar;