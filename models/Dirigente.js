const mongoose = require("mongoose");

const DirigenteSchema = mongoose.Schema({
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
  cargo: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  nombres: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Dirigente", DirigenteSchema);
