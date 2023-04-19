const Dirigente = require("../models/Dirigente");
const Club = require("../models/Club");

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
    let objArray = []
    const dirigentes = await Dirigente.find();
    
    await dirigentes.map(async (dirigente) => {
      let club = await Club.findById(dirigente.club);
      dirigente.clubDetalle = club.detalle;
      objArray.push(dirigente)

      if(objArray.length == dirigentes.length){
        res.json(objArray);
      }
    });
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
