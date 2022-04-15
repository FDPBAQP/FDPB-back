// Rutas de jugador

const express = require("express");
const router = express.Router();
const jugadorController = require("../controllers/jugadorController");

//api/preductos
router.post("/", jugadorController.crearJugador);
router.get("/", jugadorController.obtenerJugadores);
router.get("/getByFilters/:filtros", jugadorController.getByFilters);
router.put("/:id", jugadorController.actualizarJugador);
router.get("/:id", jugadorController.obtenerJugador);
router.delete("/:id", jugadorController.eliminarJugador);

module.exports = router;
