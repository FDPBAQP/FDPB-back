const mongoose = require("mongoose");

const CargoSchema = mongoose.Schema({
  detalle: {
    type: String,
    required: true,
  },
  fecha_grabacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cargo", CargoSchema);
