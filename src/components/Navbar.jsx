import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sidebar">

      <h2>Lan House</h2>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/clientes">Clientes</Link>

      <Link to="/computadores">
        Computadores
      </Link>

      <Link to="/produtos">Produtos</Link>

      <Link to="/admin">Admin</Link>

    

    </div>
  );
}

export default Navbar;