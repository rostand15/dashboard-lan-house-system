const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// rota teste
app.get("/", (req, res) => {
  res.send("API da Lan House rodando ");
});

module.exports = app;