import { useEffect, useState } from "react";

function Produtos() {

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {

    const produtosSalvos =
      JSON.parse(localStorage.getItem("produtos")) || [];

    setProdutos(produtosSalvos);

  }, []);

  function removerProduto(id) {

    const novaLista =
      produtos.filter((produto) => produto.id !== id);

    setProdutos(novaLista);

    localStorage.setItem(
      "produtos",
      JSON.stringify(novaLista)
    );
  }

  return (
    <div className="page">

      <h1>Produtos</h1>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        produtos.map((produto) => (

          <div className="card produto-card" key={produto.id}>

            <button
              className="delete-btn"
              onClick={() => removerProduto(produto.id)}
            >
              X
            </button>

            <h3>{produto.nome}</h3>

            <p>R$ {produto.preco}</p>

          </div>

        ))
      )}

    </div>
  );
}

export default Produtos;