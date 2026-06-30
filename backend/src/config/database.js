const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/lanhouse");
    console.log("MongoDB conectado 🚀");
  } catch (error) {
    console.log("Erro ao conectar no MongoDB", error);
  }
};

module.exports = connectDB;