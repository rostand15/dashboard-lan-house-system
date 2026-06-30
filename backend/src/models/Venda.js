const mongoose = require("mongoose");

const VendaSchema = new mongoose.Schema(
  {
    alimento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alimento",
      required: true,
    },
    nomeProduto: {
      type: String,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    valorUnitario: {
      type: Number,
      required: true,
    },
    valorTotal: {
      type: Number,
      required: true,
    },
    formaPagamento: {
      type: String,
      default: "Dinheiro",
    },
    dataVenda: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Venda", VendaSchema);