import { useEffect, useState } from "react";

function Dashboard() {

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const totalPCs = 10;

  useEffect(() => {

    const clientesSalvos =
      JSON.parse(localStorage.getItem("clientes")) || [];

    const produtosSalvos =
      JSON.parse(localStorage.getItem("produtos")) || [];

    setClientes(clientesSalvos);
    setProdutos(produtosSalvos);

  }, []);

  const pcsEmUso = clientes.length;

  const pcsLivres = totalPCs - pcsEmUso;

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

      </div>

      <br />

      <div className="card">

        <h2>Clientes Online</h2>

        {clientes.length === 0 ? (

          <p>Nenhum cliente conectado.</p>

        ) : (

          clientes.map((cliente) => (

            <div key={cliente.id}>

              <p>
                {cliente.nome} - {cliente.computador}
              </p>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;