const express = require("express");
const cors = require("cors");

const vendaRoutes = require("./routes/vendaRoutes");
const alimentoRoutes = require("./routes/alimentoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/vendas", vendaRoutes);
app.use("/alimentos", alimentoRoutes);

app.get("/", (req, res) => {
  res.send("API da Lan House rodando");
});

module.exports = app;