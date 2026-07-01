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

  const fecharModal = () => {
    setModalAberto(false);
    setProdutoEmEdicao(null);
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

      fecharModal();
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

  const totalProdutos = produtos.length;

  const totalUnidades = produtos.reduce((total, produto) => {
    return total + Number(produto.quantidade || 0);
  }, 0);

  const valorTotalEstoque = produtos.reduce((total, produto) => {
    return total + Number(produto.preco || 0) * Number(produto.quantidade || 0);
  }, 0);

  return (
    <main className="alimentos-container">
      <section className="alimentos-content">
        <div className="alimentos-header">
          <div>
            <h1>Produtos Alimentícios</h1>
            <p>Cadastre e gerencie os produtos disponíveis para venda.</p>
          </div>

          <button onClick={abrirCadastro} className="add-btn">
            Adicionar Produto
          </button>
        </div>

        <section className="alimentos-cards">
          <div className="resumo-card">
            <span>Produtos cadastrados</span>
            <strong>{totalProdutos}</strong>
          </div>

          <div className="resumo-card">
            <span>Unidades em estoque</span>
            <strong>{totalUnidades}</strong>
          </div>

          <div className="resumo-card">
            <span>Valor em estoque</span>
            <strong>R$ {valorTotalEstoque.toFixed(2)}</strong>
          </div>
        </section>

        <section className="alimentos-filtros">
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
        </section>

        <section className="produtos-lista">
          {produtosFiltrados.length === 0 ? (
            <div className="sem-produtos">
              <h2>Nenhum produto cadastrado</h2>
              <p>Clique em “Adicionar Produto” para cadastrar o primeiro item.</p>
            </div>
          ) : (
            produtosFiltrados.map((produto) => (
              <div className="produto-card" key={produto._id}>
                <div className="produto-topo">
                  <div>
                    <h3>{produto.nome}</h3>
                    <p className="produto-codigo">ID: {produto._id}</p>
                  </div>

                  <span className="categoria-tag">
                    {formatarCategoria(produto.categoria)}
                  </span>
                </div>

                <div className="produto-info">
                  <div>
                    <span>Preço</span>
                    <strong>R$ {Number(produto.preco).toFixed(2)}</strong>
                  </div>

                  <div>
                    <span>Estoque</span>
                    <strong>{produto.quantidade} unidade(s)</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    {produto.quantidade > 0 ? (
                      <strong className="disponivel">Disponível</strong>
                    ) : (
                      <strong className="esgotado">Esgotado</strong>
                    )}
                  </div>
                </div>

                <div className="produto-actions">
                  <button
                    onClick={() => abrirEdicao(produto)}
                    className="btn-action btn-edit"
                  >
                    Modificar
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
      </section>

      {modalAberto && produtoEmEdicao && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>
                  {produtoEmEdicao._id
                    ? "Modificar Produto"
                    : "Adicionar Produto"}
                </h2>
                <p>Preencha as informações do produto alimentício.</p>
              </div>

              <button type="button" onClick={fecharModal} className="modal-close">
                ×
              </button>
            </div>

            <form onSubmit={salvarProduto}>
              <div className="campo">
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
              </div>

              <div className="campo">
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
              </div>

              <div className="campo">
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
              </div>

              <div className="campo">
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
              </div>

              <div className="modal-actions">
                <button type="button" onClick={fecharModal}>
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