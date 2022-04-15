const Jugador = require("../models/Jugador");

exports.crearJugador = async (req, res) => {
  try {
    let jugador;
    jugador = new Jugador(req.body);
    await jugador.save();
    res.send(jugador);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en crear Jugador");
  }
};

exports.obtenerJugadores = async (req, res) => {
  try {
    const jugadores = await Jugador.find();
    res.json(jugadores);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Jugadores");
  }
};

exports.getByFilters = async (req, res) => {
  try {
    var filtros = {};

    const filtrosParams = req.params.filtros;
    const filtrosArray = filtrosParams.split("&");
    const cat = filtrosArray[0].split("=");
    const clu = filtrosArray[1].split("=");

    const categoriaValue = cat[1];
    if (
      !categoriaValue == "" ||
      !categoriaValue == null ||
      !categoriaValue == undefined
    ) {
      var categoriaFilter = {
        categoria: categoriaValue,
      };

      Object.assign(filtros, categoriaFilter);
    }

    const clubValue = clu[1];
    if (!clubValue == "" || !clubValue == null || !clubValue == undefined) {
      var clubFilter = {
        "club.0.detalle": clubValue,
      };

      Object.assign(filtros, clubFilter);
    }

    const jugadores = await Jugador.find(filtros);
    res.json(jugadores);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en getByFilters");
  }
};

exports.actualizarJugador = async (req, res) => {
  try {
    const {
      cedula,
      dni,
      libro,
      folio,
      club,
      apellidos,
      nombres,
      fecha_nacimiento,
      categoria,
      ciudad_nacimiento,
      nacionalidad,
      fecha_inscripcion,
    } = req.body;

    let jugador = await Jugador.findById(req.params.id);

    if (!jugador) {
      res.status(404).json({ msg: "El jugador no existe" });
    }

    jugador.cedula = cedula;
    jugador.dni = dni;
    jugador.libro = libro;
    jugador.folio = folio;
    jugador.club = club;
    jugador.apellidos = apellidos;
    jugador.nombres = nombres;
    jugador.fecha_nacimiento = fecha_nacimiento;
    jugador.categoria = categoria;
    jugador.ciudad_nacimiento = ciudad_nacimiento;
    jugador.nacionalidad = nacionalidad;
    jugador.fecha_inscripcion = fecha_inscripcion;

    jugador = await Jugador.findOneAndUpdate({ _id: req.params.id }, jugador, {
      new: true,
    });
    res.json(jugador);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en actualizar Jugador");
  }
};

exports.obtenerJugador = async (req, res) => {
  try {
    let jugador = await Jugador.findById(req.params.id);

    if (!jugador) {
      res.status(404).json({ msg: "El jugador no existe" });
    }

    res.json(jugador);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Jugador");
  }
};

exports.eliminarJugador = async (req, res) => {
  try {
    let jugador = await Jugador.findById(req.params.id);

    if (!jugador) {
      res.status(404).json({ msg: "El jugador no existe" });
    }

    await Jugador.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Jugador eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en eliminar Jugador");
  }
};
