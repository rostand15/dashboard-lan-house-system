import { useEffect, useState } from "react";

function Clientes() {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {

    const clientesSalvos =
      JSON.parse(localStorage.getItem("clientes")) || [];

    setClientes(clientesSalvos);

  }, []);

  function removerCliente(id) {

    const novaLista =
      clientes.filter((cliente) => cliente.id !== id);

    setClientes(novaLista);

    localStorage.setItem(
      "clientes",
      JSON.stringify(novaLista)
    );
  }

  return (
    <div className="page">

      <h1>Clientes Conectados</h1>

      {clientes.length === 0 ? (

        <p>Nenhum cliente conectado.</p>

      ) : (

        clientes.map((cliente) => (

          <div className="card produto-card" key={cliente.id}>

            <button
              className="delete-btn"
              onClick={() => removerCliente(cliente.id)}
            >
              X
            </button>

            <h3>{cliente.nome}</h3>

            <p>
              Computador: {cliente.computador}
            </p>

          </div>

        ))
      )}

    </div>
  );
}

export default Clientes;