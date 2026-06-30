const express = require("express");
const router = express.Router();

const alimentoController = require("../controllers/alimentoController");

router.get("/", alimentoController.listarAlimentos);
router.post("/", alimentoController.criarAlimento);
router.delete("/:id", alimentoController.removerAlimento);

module.exports = router;
