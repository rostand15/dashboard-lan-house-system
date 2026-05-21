import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [retraido, setRetraido] = useState(true);

  return (
    <aside className={retraido ? "sidebar retraido" : "sidebar"}>
      <div className="sidebar-header">
        <button
          className="toggle-btn"
          onClick={() => setRetraido(!retraido)}
        >
          ☰
        </button>

        {!retraido && <h2>Lan House</h2>}
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <span>🏠</span>
            {!retraido && <span>Dashboard</span>}
          </Link>
        </li>

        <li>
          <Link to="/computadores">
            <span>💻</span>
            {!retraido && <span>Computadores</span>}
          </Link>
        </li>

        <li>
          <Link to="/alimentos">
            <span>🍔</span>
            {!retraido && <span>Alimentos</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Navbar;