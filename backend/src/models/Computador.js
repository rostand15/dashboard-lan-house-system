const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  name: String,
  status: { type: String, default: "free" }
});

module.exports = mongoose.model("Machine", MachineSchema);