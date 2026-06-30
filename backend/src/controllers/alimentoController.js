const Alimento = require("../models/Alimento");

exports.listarAlimentos = async (req, res) => {
  try {
    const alimentos = await Alimento.find().sort({ createdAt: -1 });
    res.json(alimentos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao listar alimentos" });
  }
};

exports.criarAlimento = async (req, res) => {
  try {
    const { nome, preco, quantidade, categoria } = req.body;

    const alimento = await Alimento.create({
      nome,
      preco: Number(preco),
      quantidade: Number(quantidade),
      categoria: categoria || "alimento",
    });

    res.status(201).json(alimento);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao cadastrar alimento" });
  }
};

exports.atualizarAlimento = async (req, res) => {
  try {
    const { nome, preco, quantidade, categoria } = req.body;

    const alimento = await Alimento.findByIdAndUpdate(
      req.params.id,
      {
        nome,
        preco: Number(preco),
        quantidade: Number(quantidade),
        categoria,
      },
      { new: true }
    );

    if (!alimento) {
      return res.status(404).json({ erro: "Alimento não encontrado" });
    }

    res.json(alimento);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao atualizar alimento" });
  }
};

exports.removerAlimento = async (req, res) => {
  try {
    const alimento = await Alimento.findByIdAndDelete(req.params.id);

    if (!alimento) {
      return res.status(404).json({ erro: "Alimento não encontrado" });
    }

    res.json({ mensagem: "Alimento removido com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao remover alimento" });
  }
};