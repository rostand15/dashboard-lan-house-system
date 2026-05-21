import React, { useEffect, useState } from "react";
import "./Alimentos.css";

function Alimentos() {
  const [produtos, setProdutos] = useState(() => {
    const saved = localStorage.getItem("produtosAlimenticios");
    return saved ? JSON.parse(saved) : [];
  });

  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  useEffect(() => {
    localStorage.setItem("produtosAlimenticios", JSON.stringify(produtos));
  }, [produtos]);

  const novoProdutoVazio = {
    id: Date.now(),
    nome: "",
    preco: "",
    estoque: "",
    categoria: "alimento",
  };

  const abrirCadastro = () => {
    setProdutoEmEdicao(novoProdutoVazio);
    setModalAberto(true);
  };

  const abrirEdicao = (produto) => {
    setProdutoEmEdicao({ ...produto });
    setModalAberto(true);
  };

  const salvarProduto = (e) => {
    e.preventDefault();

    if (
      !produtoEmEdicao.nome ||
      !produtoEmEdicao.preco ||
      !produtoEmEdicao.estoque
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const produtoFormatado = {
      ...produtoEmEdicao,
      preco: Number(produtoEmEdicao.preco),
      estoque: Number(produtoEmEdicao.estoque),
    };

    const produtoJaExiste = produtos.some(
      (produto) => produto.id === produtoFormatado.id
    );

    if (produtoJaExiste) {
      setProdutos((prev) =>
        prev.map((produto) =>
          produto.id === produtoFormatado.id ? produtoFormatado : produto
        )
      );
    } else {
      setProdutos((prev) => [...prev, produtoFormatado]);
    }

    setModalAberto(false);
    setProdutoEmEdicao(null);
  };

  const removerProduto = (id) => {
    const confirmar = window.confirm("Deseja remover este produto?");

    if (!confirmar) return;

    setProdutos((prev) => prev.filter((produto) => produto.id !== id));
  };

  const baixarEstoque = (id) => {
    setProdutos((prev) =>
      prev.map((produto) =>
        produto.id === id && produto.estoque > 0
          ? { ...produto, estoque: produto.estoque - 1 }
          : produto
      )
    );
  };

  const formatarCategoria = (categoria) => {
    if (categoria === "alimento") return "Alimento";
    if (categoria === "bebida") return "Bebida";
    if (categoria === "doce") return "Doce";
    if (categoria === "salgado") return "Salgado";
    if (categoria === "outros") return "Outros";
    return categoria;
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const bateBusca =
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(busca.toLowerCase());

    const bateCategoria =
      filtroCategoria === "todos" || produto.categoria === filtroCategoria;

    return bateBusca && bateCategoria;
  });

  return (
    <div className="page alimentos-container">
      <h2>Produtos Alimentícios</h2>

      <div className="controls-bar">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search-input"
        />

        <div className="filter-group">
          <button
            onClick={() => setFiltroCategoria("todos")}
            className={`filter-btn ${
              filtroCategoria === "todos" ? "active" : ""
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => setFiltroCategoria("alimento")}
            className={`filter-btn ${
              filtroCategoria === "alimento" ? "active" : ""
            }`}
          >
            Alimentos
          </button>

          <button
            onClick={() => setFiltroCategoria("bebida")}
            className={`filter-btn ${
              filtroCategoria === "bebida" ? "active" : ""
            }`}
          >
            Bebidas
          </button>

          <button
            onClick={() => setFiltroCategoria("doce")}
            className={`filter-btn ${
              filtroCategoria === "doce" ? "active" : ""
            }`}
          >
            Doces
          </button>

          <button
            onClick={() => setFiltroCategoria("salgado")}
            className={`filter-btn ${
              filtroCategoria === "salgado" ? "active" : ""
            }`}
          >
            Salgados
          </button>
        </div>

        <button onClick={abrirCadastro} className="btn-action btn-add">
          Adicionar Produto
        </button>
      </div>

      <div className="alimentos-grid">
        {produtosFiltrados.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          produtosFiltrados.map((produto) => (
            <div key={produto.id} className="card alimento-card">
              <div className="card-header">
                <h3>{produto.nome}</h3>
                <span className="categoria-badge">
                  {formatarCategoria(produto.categoria)}
                </span>
              </div>

              <p>
                <strong>Preço:</strong> R$ {Number(produto.preco).toFixed(2)}
              </p>

              <p>
                <strong>Estoque:</strong> {produto.estoque} unidade(s)
              </p>

              {produto.estoque > 0 ? (
                <p className="status-disponivel">Disponível para venda</p>
              ) : (
                <p className="status-esgotado">Produto esgotado</p>
              )}

              <div className="produto-actions">
                <button
                  onClick={() => abrirEdicao(produto)}
                  className="btn-action btn-edit"
                >
                  Modificar
                </button>

                <button
                  onClick={() => baixarEstoque(produto.id)}
                  className="btn-action btn-sale"
                  disabled={produto.estoque <= 0}
                >
                  Vender
                </button>

                <button
                  onClick={() => removerProduto(produto.id)}
                  className="btn-action btn-delete"
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalAberto && produtoEmEdicao && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {produtos.some((produto) => produto.id === produtoEmEdicao.id)
                ? "Modificar Produto"
                : "Adicionar Produto"}
            </h3>

            <form onSubmit={salvarProduto}>
              <label>Nome do produto</label>
              <input
                type="text"
                value={produtoEmEdicao.nome}
                onChange={(e) =>
                  setProdutoEmEdicao({
                    ...produtoEmEdicao,
                    nome: e.target.value,
                  })
                }
                required
              />

              <label>Preço</label>
              <input
                type="number"
                step="0.01"
                value={produtoEmEdicao.preco}
                onChange={(e) =>
                  setProdutoEmEdicao({
                    ...produtoEmEdicao,
                    preco: e.target.value,
                  })
                }
                required
              />

              <label>Estoque</label>
              <input
                type="number"
                value={produtoEmEdicao.estoque}
                onChange={(e) =>
                  setProdutoEmEdicao({
                    ...produtoEmEdicao,
                    estoque: e.target.value,
                  })
                }
                required
              />

              <label>Categoria</label>
              <select
                value={produtoEmEdicao.categoria}
                onChange={(e) =>
                  setProdutoEmEdicao({
                    ...produtoEmEdicao,
                    categoria: e.target.value,
                  })
                }
              >
                <option value="alimento">Alimento</option>
                <option value="bebida">Bebida</option>
                <option value="doce">Doce</option>
                <option value="salgado">Salgado</option>
                <option value="outros">Outros</option>
              </select>

              <div className="modal-actions">
                <button type="button" onClick={() => setModalAberto(false)}>
                  Cancelar
                </button>

                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alimentos;