const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema({
  detalle: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  fecha_grabacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Club", ClubSchema);
