import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Computadores from "../pages/Computadores";

import Navbar from "../components/Navbar";

function Layout() {

  const location = useLocation();

  const mostrarNavbar = location.pathname !== "/";

  return (
    <>
    {mostrarNavbar && <Navbar />}

  <main style={{ marginLeft: mostrarNavbar ? "90px" : "0", padding: "30px" }}>
    <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      
        <Route
          path="/computadores"
          element={<Computadores />}
        />


          </Routes>
  </main>
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