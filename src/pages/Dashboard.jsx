import { useEffect, useState } from "react";

function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [computadores, setComputadores] = useState([]);

  useEffect(() => {
    carregarDados();

    window.addEventListener("storage", carregarDados);

    return () => {
      window.removeEventListener("storage", carregarDados);
    };
  }, []);

  function carregarDados() {
    const clientesSalvos =
      JSON.parse(localStorage.getItem("clientes")) || [];

    const produtosSalvos =
      JSON.parse(localStorage.getItem("produtos")) || [];

    const computadoresSalvos =
      JSON.parse(localStorage.getItem("computadores")) || [];

    setClientes(clientesSalvos);
    setProdutos(produtosSalvos);
    setComputadores(computadoresSalvos);
  }

  const pcsEmUso =
    computadores.filter(
      (pc) => pc.status === "em_uso"
    ).length;

  const pcsLivres =
    computadores.filter(
      (pc) => pc.status === "livre"
    ).length;

  const pcsManutencao =
    computadores.filter(
      (pc) => pc.status === "manutencao"
    ).length;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Clientes Conectados</h3>
          <p>{clientes.length}</p>
        </div>

        <div className="card">
          <h3>Produtos Cadastrados</h3>
          <p>{produtos.length}</p>
        </div>

        <div className="card">
          <h3>PCs em Uso</h3>
          <p>{pcsEmUso}</p>
        </div>

        <div className="card">
          <h3>PCs Livres</h3>
          <p>{pcsLivres}</p>
        </div>

        <div className="card">
          <h3>Em Manutenção</h3>
          <p>{pcsManutencao}</p>
        </div>

      </div>

      <br />

      <div className="card">
        <h2>Clientes Online</h2>

        {computadores.filter(pc => pc.status === "em_uso").length === 0 ? (
          <p>Nenhum cliente conectado.</p>
        ) : (
          computadores
            .filter((pc) => pc.status === "em_uso")
            .map((pc) => (
              <div key={pc.id}>
                <p>
                  {pc.cliente} - {pc.nome}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;