const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//creamos el servidor

const app = express();

//Conectamos con la DB

conectarDB();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({mensaje: 'Esta es la API de la FDPB Arequipa'})
});
app.use("/api/cargos", require("./routes/cargo"));
app.use("/api/clubes", require("./routes/club"));
app.use("/api/dirigentes", require("./routes/dirigente"));
app.use("/api/entrenadores", require("./routes/entrenador"));
app.use("/api/jugadores", require("./routes/jugador"));
app.use("/api/categorias", require("./routes/categoria"));

// app.listen(4000, () => {
//   console.log("Corriendo");
// });

app.listen(4000, () => {
  console.log("Corriendo en 4000");
});
