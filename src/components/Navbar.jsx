import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  const [retraido, setRetraido] = useState(true);

  return (
    <div className={`sidebar ${retraido ? 'retraido' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setRetraido(!retraido)}>
          ☰
        </button>
        {!retraido && <h2 className="logo-text">Lan House</h2>}
      </div>

      <ul className="sidebar-menu">
        <li><Link to="/dashboard" title="Dashboard">📊 {!retraido && 'Dashboard'}</Link></li>
        <li><Link to="/clientes" title="Clientes">👥 {!retraido && 'Clientes'}</Link></li>
        <li><Link to="/computadores" title="Computadores">💻 {!retraido && 'Computadores'}</Link></li>
        <li><Link to="/produtos" title="Produtos">📦 {!retraido && 'Produtos'}</Link></li>
        <li><Link to="/admin" title="Admin">⚙️ {!retraido && 'Admin'}</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;