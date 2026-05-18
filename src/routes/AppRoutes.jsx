import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
import Computadores from "../pages/Computadores";
import Produtos from "../pages/Produtos";
import Admin from "../pages/Admin";

import Navbar from "../components/Navbar";

function Layout() {

  const location = useLocation();

  const mostrarNavbar = location.pathname !== "/";

  return (
    <>
      {mostrarNavbar && <Navbar />}

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/clientes"
          element={<Clientes />}
        />

        <Route
          path="/computadores"
          element={<Computadores />}
        />

        <Route
          path="/produtos"
          element={<Produtos />}
        />

        <Route
        path="/admin"
        element={<Admin />}
        />

      </Routes>
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default AppRoutes;