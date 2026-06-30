import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Computadores from "../pages/Computadores";
import Alimentos from "../pages/Alimentos";
import Vendas from "../pages/Vendas";

import Navbar from "../components/Navbar";

function Layout() {
  const location = useLocation();
  const mostrarNavbar = location.pathname !== "/";

  return (
    <>
      {mostrarNavbar ? (
        <div className="app-container">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/computadores" element={<Computadores />} />
              <Route path="/alimentos" element={<Alimentos />} />
              <Route path="/vendas" element={<Vendas />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
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