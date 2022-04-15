// Rutas de dirigente

const express = require("express");
const router = express.Router();
const dirigenteController = require("../controllers/dirigenteController");

//api/preductos
router.post("/", dirigenteController.crearDirigente);
router.get("/", dirigenteController.obtenerDirigentes);
router.put("/:id", dirigenteController.actualizarDirigente);
router.get("/:id", dirigenteController.obtenerDirigente);
router.delete("/:id", dirigenteController.eliminarDirigente);

module.exports = router;
