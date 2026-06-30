import React, { useEffect, useState } from "react";
import "./Alimentos.css";

function Alimentos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  const API_URL = "http://localhost:3001";

  const carregarAlimentos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/alimentos`);
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao carregar alimentos");
      }

      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao carregar alimentos:", error);
      alert("Não foi possível carregar os alimentos.");
    }
  };

  useEffect(() => {
    carregarAlimentos();
  }, []);

  const novoProdutoVazio = {
    nome: "",
    preco: "",
    quantidade: "",
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

  const salvarProduto = async (e) => {
    e.preventDefault();

    if (
      !produtoEmEdicao.nome ||
      !produtoEmEdicao.preco ||
      !produtoEmEdicao.quantidade
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const dadosProduto = {
      nome: produtoEmEdicao.nome,
      preco: Number(produtoEmEdicao.preco),
      quantidade: Number(produtoEmEdicao.quantidade),
      categoria: produtoEmEdicao.categoria || "alimento",
    };

    try {
      let resposta;

      if (produtoEmEdicao._id) {
        resposta = await fetch(`${API_URL}/alimentos/${produtoEmEdicao._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosProduto),
        });
      } else {
        resposta = await fetch(`${API_URL}/alimentos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosProduto),
        });
      }

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao salvar produto.");
        return;
      }

      setModalAberto(false);
      setProdutoEmEdicao(null);
      carregarAlimentos();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const removerProduto = async (id) => {
    const confirmar = window.confirm("Deseja remover este produto?");

    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API_URL}/alimentos/${id}`, {
        method: "DELETE",
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao remover produto.");
        return;
      }

      carregarAlimentos();
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      alert("Erro ao remover produto.");
    }
  };

  const baixarEstoque = async (produto) => {
    const quantidade = Number(prompt("Quantidade vendida:"));

    if (!quantidade || quantidade <= 0) {
      alert("Quantidade inválida.");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/vendas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alimentoId: produto._id,
          quantidade,
          formaPagamento: "Dinheiro",
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao registrar venda.");
        return;
      }

      alert("Venda registrada com sucesso!");
      carregarAlimentos();
    } catch (error) {
      console.error("Erro ao vender produto:", error);
      alert("Erro de conexão com o servidor.");
    }
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
    const nome = produto.nome || "";
    const categoria = produto.categoria || "";

    const bateBusca =
      nome.toLowerCase().includes(busca.toLowerCase()) ||
      categoria.toLowerCase().includes(busca.toLowerCase());

    const bateCategoria =
      filtroCategoria === "todos" || categoria === filtroCategoria;

    return bateBusca && bateCategoria;
  });

  return (
    <main className="alimentos-container">
      <div className="alimentos-header">
        <h1>Produtos Alimentícios</h1>

        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search-input"
        />

        <div className="filters">
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

        <button onClick={abrirCadastro} className="add-btn">
          Adicionar Produto
        </button>
      </div>

      <section className="produtos-lista">
        {produtosFiltrados.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          produtosFiltrados.map((produto) => (
            <div className="produto-card" key={produto._id}>
              <div className="produto-topo">
                <h3>{produto.nome}</h3>
                <span className="categoria-tag">
                  {formatarCategoria(produto.categoria)}
                </span>
              </div>

              <p>
                <strong>Preço:</strong> R$ {Number(produto.preco).toFixed(2)}
              </p>

              <p>
                <strong>Estoque:</strong> {produto.quantidade} unidade(s)
              </p>

              {produto.quantidade > 0 ? (
                <p className="disponivel">Disponível para venda</p>
              ) : (
                <p className="esgotado">Produto esgotado</p>
              )}

              <div className="produto-actions">
                <button
                  onClick={() => abrirEdicao(produto)}
                  className="btn-action btn-edit"
                >
                  Modificar
                </button>

                <button
                  onClick={() => baixarEstoque(produto)}
                  className="btn-action btn-sale"
                  disabled={produto.quantidade <= 0}
                >
                  Vender
                </button>

                <button
                  onClick={() => removerProduto(produto._id)}
                  className="btn-action btn-delete"
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {modalAberto && produtoEmEdicao && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {produtoEmEdicao._id ? "Modificar Produto" : "Adicionar Produto"}
            </h2>

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
                value={produtoEmEdicao.quantidade}
                onChange={(e) =>
                  setProdutoEmEdicao({
                    ...produtoEmEdicao,
                    quantidade: e.target.value,
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
    </main>
  );
}

export default Alimentos;