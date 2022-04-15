const Dirigente = require("../models/Dirigente");

exports.crearDirigente = async (req, res) => {
  try {
    let dirigentes;
    dirigentes = new Dirigente(req.body);
    await dirigentes.save();
    res.send(dirigentes);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en crear Dirigente");
  }
};

exports.obtenerDirigentes = async (req, res) => {
  try {
    const dirigenteses = await Dirigente.find();
    res.json(dirigenteses);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Dirigentes");
  }
};

exports.actualizarDirigente = async (req, res) => {
  try {
    const { dni, club, cargo, apellidos, nombres, telefono } = req.body;

    let dirigentes = await Dirigente.findById(req.params.id);

    if (!dirigentes) {
      res.status(404).json({ msg: "El dirigentes no existe" });
    }

    dirigentes.dni = dni;
    dirigentes.club = club;
    dirigentes.cargo = cargo;
    dirigentes.apellidos = apellidos;
    dirigentes.nombres = nombres;
    dirigentes.telefono = telefono;

    dirigentes = await Dirigente.findOneAndUpdate(
      { _id: req.params.id },
      dirigentes,
      {
        new: true,
      }
    );
    res.json(dirigentes);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en actualizar Dirigente");
  }
};

exports.obtenerDirigente = async (req, res) => {
  try {
    let dirigentes = await Dirigente.findById(req.params.id);

    if (!dirigentes) {
      res.status(404).json({ msg: "El dirigentes no existe" });
    }

    res.json(dirigentes);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Dirigente");
  }
};

exports.eliminarDirigente = async (req, res) => {
  try {
    let dirigentes = await Dirigente.findById(req.params.id);

    if (!dirigentes) {
      res.status(404).json({ msg: "El dirigentes no existe" });
    }

    await Dirigente.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Dirigente eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en eliminar Dirigente");
  }
};
