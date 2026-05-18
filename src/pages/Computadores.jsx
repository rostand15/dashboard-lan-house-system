import { useEffect, useState } from "react";
import computadores from "../data/computadores";

function Computadores() {

  const [clientes, setClientes] = useState([]);

  const computadores = [
  "PC GAMER 01",
  "PC GAMER 02",
  "PC GAMER 03",
  "PC GAMER 04",
  "PC GAMER 05",
  "PC GAMER 06",
  "PC GAMER 07",
  "PC COMUM 01",
  "PC 02",
  "PC 03"
];

  useEffect(() => {

    const clientesSalvos =
      JSON.parse(localStorage.getItem("clientes")) || [];

    setClientes(clientesSalvos);

  }, []);

  function verificarStatus(pc) {

    const emUso = clientes.some(
      (cliente) => cliente.computador === pc
    );

    return emUso ? "Em uso" : "Livre";
  }

  function nomeCliente(pc) {

    const cliente = clientes.find(
      (cliente) => cliente.computador === pc
    );

    return cliente ? cliente.nome : null;
  }

  return (
    <div className="page">

      <h1>Computadores</h1>

      <div className="cards">

        {computadores.map((pc) => {

          const status = verificarStatus(pc);

          const cliente = nomeCliente(pc);

          return (

            <div className="card" key={pc}>

              <h2>{pc}</h2>

              <p>
                Status:
                {" "}
                <strong>
                  {status}
                </strong>
              </p>

              {cliente && (
                <p>
                  Cliente:
                  {" "}
                  {cliente}
                </p>
              )}

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default Computadores;