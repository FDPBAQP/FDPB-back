const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//creamos el servidor

const app = express();

//Conectamos con la DB

conectarDB();
app.use(cors({
  Access_Control_Allow_Origin: "*",
  origin:"*",
  methode:['GET','POST','PATCH','DELETE','PUT'],
  allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept'

}));

app.use(express.json());

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
