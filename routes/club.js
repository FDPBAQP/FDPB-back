// Rutas de club

const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");

//api/preductos
router.post("/", clubController.crearClub);
router.get("/", clubController.obtenerClubes);
router.put("/:id", clubController.actualizarClub);
router.get("/:id", clubController.obtenerClub);
router.delete("/:id", clubController.eliminarClub);

module.exports = router;
