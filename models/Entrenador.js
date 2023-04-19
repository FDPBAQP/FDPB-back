const mongoose = require("mongoose");

const EntrenadorSchema = mongoose.Schema({
  dni: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  clubDetalle: {
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
  nacionalidad: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Entrenador", EntrenadorSchema);
