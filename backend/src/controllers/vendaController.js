const Venda = require("../models/Venda");
const Alimento = require("../models/Alimento");

exports.listarVendas = async (req, res) => {
  try {
    const vendas = await Venda.find()
      .populate("alimento")
      .sort({ dataVenda: -1 });

    res.json(vendas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar vendas" });
  }
};

exports.criarVenda = async (req, res) => {
  try {
    const { alimentoId, quantidade, formaPagamento } = req.body;

    const alimento = await Alimento.findById(alimentoId);

    if (!alimento) {
      return res.status(404).json({ erro: "Alimento não encontrado" });
    }

    if (Number(quantidade) <= 0) {
      return res.status(400).json({ erro: "Quantidade inválida" });
    }

    if (Number(alimento.quantidade) < Number(quantidade)) {
      return res.status(400).json({ erro: "Estoque insuficiente" });
    }

    const valorUnitario = Number(alimento.preco);
    const valorTotal = Number(quantidade) * valorUnitario;

    const venda = await Venda.create({
      alimento: alimento._id,
      nomeProduto: alimento.nome,
      quantidade: Number(quantidade),
      valorUnitario,
      valorTotal,
      formaPagamento,
    });

    alimento.quantidade = Number(alimento.quantidade) - Number(quantidade);
    await alimento.save();

    res.status(201).json(venda);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao registrar venda" });
  }
};

exports.removerVenda = async (req, res) => {
  try {
    const venda = await Venda.findById(req.params.id);

    if (!venda) {
      return res.status(404).json({ erro: "Venda não encontrada" });
    }

    const alimento = await Alimento.findById(venda.alimento);

    if (alimento) {
      alimento.quantidade = Number(alimento.quantidade) + Number(venda.quantidade);
      await alimento.save();
    }

    await Venda.findByIdAndDelete(req.params.id);

    res.json({ mensagem: "Venda removida com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover venda" });
  }
};