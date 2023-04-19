const mongoose = require("mongoose");

const JugadorSchema = mongoose.Schema({
  cedula: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  libro: {
    type: String,
    required: true,
  },
  folio: {
    type: String,
    required: true,
  },
  club: [
    {
      detalle: { type: String, required: true },
      tipo: { type: String, required: true },
      fecha_grabacion: { type: Date, default: Date.now() },
    },
  ],
  clubActual: {
    type: String,
    required: false,
  },
  apellidos: {
    type: String,
    required: true,
  },
  nombres: {
    type: String,
    required: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  ciudad_nacimiento: {
    type: String,
    required: true,
  },
  nacionalidad: {
    type: String,
    required: true,
  },
  fecha_inscripcion: {
    type: Date,
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Jugador", JugadorSchema);
