// Rutas de entrenador

const express = require("express");
const router = express.Router();
const entrenadorController = require("../controllers/entrenadorController");

//api/preductos
router.post("/", entrenadorController.crearEntrenador);
router.get("/", entrenadorController.obtenerEntrenadores);
router.put("/:id", entrenadorController.actualizarEntrenador);
router.get("/:id", entrenadorController.obtenerEntrenador);
router.delete("/:id", entrenadorController.eliminarEntrenador);

module.exports = router;
