import { useEffect, useState } from "react";

function Admin() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState([]);

  const [nomeCliente, setNomeCliente] = useState("");
  const [computador, setComputador] = useState("");
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    const clientesSalvos = JSON.parse(localStorage.getItem("clientes")) || [];

    setProdutos(produtosSalvos);
    setClientes(clientesSalvos);
  }, []);

  function adicionarProduto() {
    if (!nomeProduto || !preco) {
      alert("Preencha o nome e o preço do produto.");
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome: nomeProduto,
      preco: preco,
    };

    const novaLista = [...produtos, novoProduto];

    localStorage.setItem("produtos", JSON.stringify(novaLista));
    setProdutos(novaLista);

    alert("Produto cadastrado com sucesso!");

    setNomeProduto("");
    setPreco("");
  }

  function adicionarCliente() {
    if (!nomeCliente || !computador) {
      alert("Preencha o nome do cliente e o computador.");
      return;
    }

    const novoCliente = {
      id: Date.now(),
      nome: nomeCliente,
      computador: computador,
    };

    const novaLista = [...clientes, novoCliente];

    localStorage.setItem("clientes", JSON.stringify(novaLista));
    setClientes(novaLista);

    alert("Cliente cadastrado com sucesso!");

    setNomeCliente("");
    setComputador("");
  }

  return (
  <div style={{ padding: "30px", color: "white", marginLeft: "90px" }}>
      <h1>Área Admin</h1>

      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>Cadastrar Produto</h2>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button onClick={adicionarProduto} style={{ padding: "10px" }}>
          Adicionar Produto
        </button>
      </div>

      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Cadastrar Cliente</h2>

        <input
          type="text"
          placeholder="Nome do cliente"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Computador"
          value={computador}
          onChange={(e) => setComputador(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button onClick={adicionarCliente} style={{ padding: "10px" }}>
          Adicionar Cliente
        </button>
      </div>

      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Produtos Cadastrados</h2>

        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          produtos.map((produto) => (
            <p key={produto.id}>
              {produto.nome} - R$ {produto.preco}
            </p>
          ))
        )}
      </div>

      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Clientes Cadastrados</h2>

        {clientes.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          clientes.map((cliente) => (
            <p key={cliente.id}>
              {cliente.nome} - Computador: {cliente.computador}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;