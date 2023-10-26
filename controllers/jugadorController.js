const Jugador = require("../models/Jugador");
const Club = require("../models/Club");

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
    let objArray = []
    const jugadores = await Jugador.find();
    
    await jugadores.map(async (jugador) => {
      let club = await Club.findById(jugador.club[0].detalle);
      jugador.clubActual = club.detalle;
      objArray.push(jugador)

      if(objArray.length == jugadores.length){

        objArray.sort(function (a, b) {
          if (a.apellidos > b.apellidos) { 
            return 1;
          } else if (a.apellidos < b.apellidos) {
            return -1;
          } 
          return 0;
        });
        res.json(objArray);
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Jugadores");
  }
};

exports.obtenerJugadoresFilter = async (req, res) => {
  try {
    let objArray = []
    let filtered
    const {
      apellido,
      nombre,
      dni,
      cedula
    } = req.body;
    let jugadores = await Jugador.find();

    if(apellido){
      jugadores = jugadores.filter(user => user.apellidos.includes(apellido))
    }
    if(nombre){
      jugadores = jugadores.filter(user => user.nombres.includes(nombre))
    }
    if(dni){
      jugadores = jugadores.filter(user => user.dni.includes(dni))
    }
    if(cedula){
      jugadores = jugadores.filter(user => user.cedula.includes(cedula))
    }
    
    await jugadores.map(async (jugador) => {
      console.log("jugador.club[0].detalle", jugador.club[0].detalle)
      let club = await Club.findById(jugador.club[0].detalle);
      console.log("club", club)
      jugador.clubActual = club.detalle;
      objArray.push(jugador)

      if(objArray.length == jugadores.length){
        objArray.sort(function (a, b) {
          if (a.apellidos > b.apellidos) { 
            return 1;
          } else if (a.apellidos < b.apellidos) {
            return -1;
          } 
          return 0;
        });

        console.log("array", objArray);
        res.json(objArray);
      }
    });

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

exports.getByName = async (req, res) => {
  try {
    var filtros = {};

    const filtrosParams = req.params.name;
    const filtrosArray = filtrosParams.split("&");
    const nom = filtrosArray[0].split("=");
    const ape = filtrosArray[1].split("=");
    const doc = filtrosArray[2].split("=");

    const nombreValue = nom[1];
    if ( !nombreValue == "" || !nombreValue == null || !nombreValue == undefined ) {
      var nombreFilter = {
        nombres: nombreValue,
      };

      Object.assign(filtros, nombreFilter);
    }
    const apellidoValue = ape[1];
    if ( !apellidoValue == "" || !apellidoValue == null || !apellidoValue == undefined ) {
      var apellidoFilter = {
        apellidos: apellidoValue,
      };

      Object.assign(filtros, apellidoFilter);
    }
    const documentoValue = doc[1];
    if ( !documentoValue == "" || !documentoValue == null || !documentoValue == undefined ) {
      var documentoFilter = {
        dni: documentoValue,
      };

      Object.assign(filtros, documentoFilter);
    }

    const jugadores = await Jugador.find(filtros);
    
    console.log("getByName", filtros)
    res.json(jugadores);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en visualizar Jugador");
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

exports.actualizarCategoriaJugador = async (req, res) => {
  try {
    const {
      id,
      categoria,
    } = req.body;

    let actualizar = await Jugador.findById(id);

    actualizar.categoria = categoria;

    actualizar = await Jugador.findOneAndUpdate({ _id: id }, actualizar, {
      new: true,
    });
    res.json(actualizar);
  } catch (error) {
    console.log(error);
    res.status(500).send("tenemos problemas en actualizar Jugador");
  }
};
