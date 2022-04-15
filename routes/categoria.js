// Rutas de categoria

const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

//api/preductos
router.post("/", categoriaController.crearCategoria);
router.get("/", categoriaController.obtenerCategorias);
router.put("/:id", categoriaController.actualizarCategoria);
router.get("/:id", categoriaController.obtenerCategoria);
router.delete("/:id", categoriaController.eliminarCategoria);

module.exports = router;
