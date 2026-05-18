import { useEffect, useState } from "react";
import computadores from "../data/computadores";


function Admin() {

  // PRODUTOS

  const [nomeProduto, setNomeProduto] = useState("");
  const [preco, setPreco] = useState("");

  const [produtos, setProdutos] = useState([]);

  // CLIENTES

  const [nomeCliente, setNomeCliente] = useState("");
  const [computador, setComputador] = useState("");

  const [clientes, setClientes] = useState([]);

  useEffect(() => {

    const produtosSalvos =
      JSON.parse(localStorage.getItem("produtos")) || [];

    const clientesSalvos =
      JSON.parse(localStorage.getItem("clientes")) || [];

    setProdutos(produtosSalvos);

    setClientes(clientesSalvos);

  }, []);

  // ADICIONAR PRODUTO

  function adicionarProduto() {

    if (nomeProduto === "" || preco === "") {

      alert("Preencha todos os campos!");

      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome: nomeProduto,
      preco
    };

    const novaLista = [...produtos, novoProduto];

    setProdutos(novaLista);

    localStorage.setItem(
      "produtos",
      JSON.stringify(novaLista)
    );

    setNomeProduto("");
    setPreco("");
  }

  // ADICIONAR CLIENTE

  function adicionarCliente() {

    if (nomeCliente === "" || computador === "") {

      alert("Preencha todos os campos!");

      return;
    }

    const novoCliente = {
      id: Date.now(),
      nome: nomeCliente,
      computador
    };

    const novaLista = [...clientes, novoCliente];

    setClientes(novaLista);

    localStorage.setItem(
      "clientes",
      JSON.stringify(novaLista)
    );

    setNomeCliente("");
    setComputador("");
  }

  return (
    <div className="page">

      <h1>Área Admin</h1>

      {/* PRODUTOS */}

      <div className="card">

        <h2>Adicionar Produto</h2>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <br /><br />

        <button onClick={adicionarProduto}>
          Adicionar Produto
        </button>

      </div>

      <br />

      {/* CLIENTES */}

      <div className="card">

        <h2>Adicionar Cliente</h2>

        <input
          type="text"
          placeholder="Nome do cliente"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
        />

        <br /><br />

            <select
        value={computador}
        onChange={(e) => setComputador(e.target.value)}
        >

        <option value="">
            Selecione um computador
        </option>

        {computadores.map((pc) => {

            const emUso = clientes.some(
            (cliente) => cliente.computador === pc
            );

            return (

            <option
                key={pc}
                value={pc}
                disabled={emUso}
            >

                {pc}
                {emUso ? " (Em uso)" : ""}

            </option>

            );
        })}

        </select>

        <br /><br />

        <button onClick={adicionarCliente}>
          Adicionar Cliente
        </button>

      </div>

    </div>
  );
}

export default Admin;