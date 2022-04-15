const Categoria = require("../models/Categoria");

exports.crearCategoria = async (req, res) => {
  try {
    let categoria;
    categoria = new Categoria(req.body);
    await categoria.save();
    res.send(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en crear Categoria");
  }
};

exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Categorias");
  }
};

exports.actualizarCategoria = async (req, res) => {
  try {
    const { detalle, desde, hasta } = req.body;

    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: "La categoria no existe" });
    }

    categoria.detalle = detalle;
    categoria.desde = desde;
    categoria.hasta = hasta;

    categoria = await Categoria.findOneAndUpdate(
      { _id: req.params.id },
      categoria,
      {
        new: true,
      }
    );
    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en actualizar Categoria");
  }
};

exports.obtenerCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: "La categoria no existe" });
    }

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Categoria");
  }
};

exports.eliminarCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: "La categoria no existe" });
    }

    await Categoria.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Categoria eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en eliminar Categoria");
  }
};
