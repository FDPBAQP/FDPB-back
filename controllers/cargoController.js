const Cargo = require("../models/Cargo");

exports.crearCargo = async (req, res) => {
  try {
    let cargo;
    cargo = new Cargo(req.body);
    await cargo.save();
    res.send(cargo);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en crear Cargo");
  }
};

exports.obtenerCargos = async (req, res) => {
  try {
    const cargos = await Cargo.find();
    res.json(cargos);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Cargos");
  }
};

exports.actualizarCargo = async (req, res) => {
  try {
    const { detalle, fecha_grabacion } = req.body;

    let cargo = await Cargo.findById(req.params.id);

    if (!cargo) {
      res.status(404).json({ msg: "El cargo no existe" });
    }

    cargo.detalle = detalle;
    cargo.fecha_grabacion = fecha_grabacion;

    cargo = await Cargo.findOneAndUpdate({ _id: req.params.id }, cargo, {
      new: true,
    });
    res.json(cargo);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en actualizar Cargo");
  }
};

exports.obtenerCargo = async (req, res) => {
  try {
    let cargo = await Cargo.findById(req.params.id);

    if (!cargo) {
      res.status(404).json({ msg: "El cargo no existe" });
    }

    res.json(cargo);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Cargo");
  }
};

exports.eliminarCargo = async (req, res) => {
  try {
    let cargo = await Cargo.findById(req.params.id);

    if (!cargo) {
      res.status(404).json({ msg: "El cargo no existe" });
    }

    await Cargo.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Cargo eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en eliminar Cargo");
  }
};
