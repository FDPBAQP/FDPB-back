// Rutas de jugador

const express = require("express");
const router = express.Router();
const jugadorController = require("../controllers/jugadorController");

//api/preductos
router.post("/", jugadorController.crearJugador);
router.get("/", jugadorController.obtenerJugadores);
router.post("/filter", jugadorController.obtenerJugadoresFilter);
router.get("/getByFilters/:filtros", jugadorController.getByFilters);
router.get("/getByName/:name", jugadorController.getByName);
router.put("/:id", jugadorController.actualizarJugador);
router.get("/:id", jugadorController.obtenerJugador);
router.delete("/:id", jugadorController.eliminarJugador);
router.post("/actualizarCategoria", jugadorController.actualizarCategoriaJugador);

module.exports = router;
