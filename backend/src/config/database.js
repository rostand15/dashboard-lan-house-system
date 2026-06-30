const mongoose = require("mongoose");
const dns = require("dns");

// Força o Node a usar DNS público para resolver o MongoDB Atlas
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas conectado 🚀");
  } catch (error) {
    console.log("Erro ao conectar no MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;