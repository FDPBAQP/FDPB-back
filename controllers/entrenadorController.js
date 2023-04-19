const Entrenador = require("../models/Entrenador");
const Club = require("../models/Club");

exports.crearEntrenador = async (req, res) => {
  try {
    let entrenador;
    entrenador = new Entrenador(req.body);
    await entrenador.save();
    res.send(entrenador);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en crear Entrenador");
  }
};

exports.obtenerEntrenadores = async (req, res) => {
  try {
    let objArray = []
    const entrenadores = await Entrenador.find();
    
    await entrenadores.map(async (entrenador) => {
      let club = await Club.findById(entrenador.club);
      entrenador.clubDetalle = club.detalle;
      objArray.push(entrenador)

      if(objArray.length == entrenadores.length){
        res.json(objArray);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Entrenadores");
  }
};

exports.actualizarEntrenador = async (req, res) => {
  try {
    const { dni, club, apellidos, nombres, nacionalidad, telefono } = req.body;

    let entrenador = await Entrenador.findById(req.params.id);

    if (!entrenador) {
      res.status(404).json({ msg: "El entrenador no existe" });
    }

    entrenador.dni = dni;
    entrenador.club = club;
    entrenador.apellidos = apellidos;
    entrenador.nombres = nombres;
    entrenador.nacionalidad = nacionalidad;
    entrenador.telefono = telefono;

    entrenador = await Entrenador.findOneAndUpdate(
      { _id: req.params.id },
      entrenador,
      {
        new: true,
      }
    );
    res.json(entrenador);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en actualizar Entrenador");
  }
};

exports.obtenerEntrenador = async (req, res) => {
  try {
    let entrenador = await Entrenador.findById(req.params.id);

    if (!entrenador) {
      res.status(404).json({ msg: "El entrenador no existe" });
    }

    res.json(entrenador);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Entrenador");
  }
};

exports.eliminarEntrenador = async (req, res) => {
  try {
    let entrenador = await Entrenador.findById(req.params.id);

    if (!entrenador) {
      res.status(404).json({ msg: "El entrenador no existe" });
    }

    await Entrenador.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Entrenador eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en eliminar Entrenador");
  }
};
