require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});