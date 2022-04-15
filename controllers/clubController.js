const Club = require("../models/Club");

exports.crearClub = async (req, res) => {
  try {
    let club;
    club = new Club(req.body);
    await club.save();
    res.send(club);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en crear Club");
  }
};

exports.obtenerClubes = async (req, res) => {
  try {
    const clubes = await Club.find();
    res.json(clubes);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Clubes");
  }
};

exports.actualizarClub = async (req, res) => {
  try {
    const { detalle, tipo, fecha_grabacion } = req.body;

    let club = await Club.findById(req.params.id);

    if (!club) {
      res.status(404).json({ msg: "El club no existe" });
    }

    club.detalle = detalle;
    club.tipo = tipo;
    club.fecha_grabacion = fecha_grabacion;

    club = await Club.findOneAndUpdate({ _id: req.params.id }, club, {
      new: true,
    });
    res.json(club);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en actualizar Club");
  }
};

exports.obtenerClub = async (req, res) => {
  try {
    let club = await Club.findById(req.params.id);

    if (!club) {
      res.status(404).json({ msg: "El club no existe" });
    }

    res.json(club);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Club");
  }
};

exports.eliminarClub = async (req, res) => {
  try {
    let club = await Club.findById(req.params.id);

    if (!club) {
      res.status(404).json({ msg: "El club no existe" });
    }

    await Club.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Club eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en eliminar Club");
  }
};
