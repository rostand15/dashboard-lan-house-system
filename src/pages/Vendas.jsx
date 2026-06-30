import { useEffect, useState } from "react";
import "./Vendas.css";

function Vendas() {
  const [alimentos, setAlimentos] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [alimentoId, setAlimentoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("Dinheiro");

  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const carregarAlimentos = async () => {
    try {
      const resposta = await fetch("http://localhost:3001/alimentos");
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error("Erro ao buscar alimentos");
      }

      setAlimentos(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os alimentos.");
    }
  };

  const carregarVendas = async () => {
    try {
      const resposta = await fetch("http://localhost:3001/vendas");
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error("Erro ao buscar vendas");
      }

      setVendas(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar as vendas.");
    }
  };

  useEffect(() => {
    carregarAlimentos();
    carregarVendas();
  }, []);

  const alimentoSelecionado = alimentos.find(
    (alimento) => alimento._id === alimentoId
  );

  const valorPrevisto =
    alimentoSelecionado && quantidade
      ? Number(alimentoSelecionado.preco) * Number(quantidade)
      : 0;

  const registrarVenda = async (e) => {
    e.preventDefault();

    setErro("");
    setMensagem("");

    if (!alimentoId) {
      setErro("Selecione um alimento.");
      return;
    }

    if (!quantidade || Number(quantidade) <= 0) {
      setErro("Informe uma quantidade válida.");
      return;
    }

    if (alimentoSelecionado.quantidade < Number(quantidade)) {
      setErro("Quantidade maior que o estoque disponível.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3001/vendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alimentoId,
          quantidade: Number(quantidade),
          formaPagamento,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro || "Erro ao registrar venda.");
        return;
      }

      setMensagem("Venda registrada com sucesso!");
      setAlimentoId("");
      setQuantidade("");
      setFormaPagamento("Dinheiro");

      await carregarAlimentos();
      await carregarVendas();
    } catch (error) {
      console.error(error);
      setErro("Erro de conexão com o servidor.");
    }
  };

  const removerVenda = async (id) => {
    const confirmar = window.confirm("Deseja remover essa venda?");

    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:3001/vendas/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        setErro("Erro ao remover venda.");
        return;
      }

      setMensagem("Venda removida com sucesso!");

      await carregarAlimentos();
      await carregarVendas();
    } catch (error) {
      console.error(error);
      setErro("Erro ao remover venda.");
    }
  };

  const totalVendido = vendas.reduce((total, venda) => {
    return total + Number(venda.valorTotal || 0);
  }, 0);

  const totalItensVendidos = vendas.reduce((total, venda) => {
    return total + Number(venda.quantidade || 0);
  }, 0);

  return (
    <main className="vendas-container">
      <div className="vendas-header">
        <div>
          <h1>Registro de Vendas</h1>
          <p>Controle de produtos alimentícios vendidos na lan house.</p>
        </div>
      </div>

      <section className="vendas-cards">
        <div className="venda-card">
          <span>Total vendido</span>
          <strong>R$ {totalVendido.toFixed(2)}</strong>
        </div>

        <div className="venda-card">
          <span>Itens vendidos</span>
          <strong>{totalItensVendidos}</strong>
        </div>

        <div className="venda-card">
          <span>Produtos cadastrados</span>
          <strong>{alimentos.length}</strong>
        </div>
      </section>

      <section className="vendas-box">
        <h2>Nova venda</h2>

        {erro && <div className="alerta erro">{erro}</div>}
        {mensagem && <div className="alerta sucesso">{mensagem}</div>}

        <form className="vendas-form" onSubmit={registrarVenda}>
          <div className="campo">
            <label>Alimento</label>
            <select
              value={alimentoId}
              onChange={(e) => setAlimentoId(e.target.value)}
            >
              <option value="">Selecione um alimento</option>

              {alimentos.map((alimento) => (
                <option key={alimento._id} value={alimento._id}>
                  {alimento.nome} | R$ {Number(alimento.preco).toFixed(2)} | Estoque:{" "}
                  {alimento.quantidade}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Quantidade</label>
            <input
              type="number"
              min="1"
              placeholder="Ex: 2"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Pagamento</label>
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
              <option value="Cartão">Cartão</option>
            </select>
          </div>

          <div className="campo">
            <label>Valor total</label>
            <input
              type="text"
              value={`R$ ${valorPrevisto.toFixed(2)}`}
              disabled
            />
          </div>

          <button className="btn-registrar" type="submit">
            Registrar venda
          </button>
        </form>
      </section>

      <section className="vendas-box">
        <h2>Histórico de vendas</h2>

        {vendas.length === 0 ? (
          <p className="sem-vendas">Nenhuma venda registrada ainda.</p>
        ) : (
          <table className="vendas-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd.</th>
                <th>Valor unitário</th>
                <th>Total</th>
                <th>Pagamento</th>
                <th>Data</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {vendas.map((venda) => (
                <tr key={venda._id}>
                  <td>{venda.nomeProduto}</td>
                  <td>{venda.quantidade}</td>
                  <td>R$ {Number(venda.valorUnitario).toFixed(2)}</td>
                  <td>R$ {Number(venda.valorTotal).toFixed(2)}</td>
                  <td>{venda.formaPagamento}</td>
                  <td>
                    {new Date(venda.dataVenda).toLocaleDateString("pt-BR")}
                  </td>
                  <td>
                    <button
                      className="btn-remover"
                      onClick={() => removerVenda(venda._id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default Vendas;