// Rutas de cargo

const express = require("express");
const router = express.Router();
const cargoController = require("../controllers/cargoController");

//api/preductos
router.post("/", cargoController.crearCargo);
router.get("/", cargoController.obtenerCargos);
router.put("/:id", cargoController.actualizarCargo);
router.get("/:id", cargoController.obtenerCargo);
router.delete("/:id", cargoController.eliminarCargo);

module.exports = router;
