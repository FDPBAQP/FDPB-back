const mongoose = require("mongoose");

const CategoriaSchema = mongoose.Schema({
  detalle: {
    type: String,
    required: true,
  },
  desde: {
    type: Number,
    required: true,
  },
  hasta: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Categoria", CategoriaSchema);
