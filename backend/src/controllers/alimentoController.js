const Alimento = require("../models/Alimento");

exports.listarAlimentos = async (req, res) => {
  try {
    const alimentos = await Alimento.find().sort({ createdAt: -1 });
    res.json(alimentos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar alimentos" });
  }
};

exports.criarAlimento = async (req, res) => {
  try {
    const { nome, preco, quantidade } = req.body;

    const alimento = await Alimento.create({
      nome,
      preco,
      quantidade,
    });

    res.status(201).json(alimento);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar alimento" });
  }
};

exports.removerAlimento = async (req, res) => {
  try {
    await Alimento.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Alimento removido com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover alimento" });
  }
};