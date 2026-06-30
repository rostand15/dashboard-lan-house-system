const express = require("express");
const cors = require("cors");

const alimentoRoutes = require("./routes/alimentoRoutes");
const vendaRoutes = require("./routes/vendaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/alimentos", alimentoRoutes);
app.use("/vendas", vendaRoutes);

// Login não precisa validar banco agora
// const authRoutes = require("./routes/authRoutes");
// app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API da Lan House rodando");
});

module.exports = app;