const app = require("./app");
const connectDB = require("./config/db");

const PORT = 3001;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});