const mongoose = require("mongoose");

const AlimentoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    categoria: {
      type: String,
      default: "alimento",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Alimento", AlimentoSchema);