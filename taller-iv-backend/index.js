const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ message: "El servidor está funcionando correctamente" });
});

app.get("/api/info", (req, res) => {
  res.json({
    mensaje: "El API está funcionando correctamente",
    integrantes: [
      {
        nombre: "Sebastian Villalobos",
        edad: 20,
        carrera: "Ingeniería informática",
        materiasAprobadas: 22
      }, {
        nombre: "Diego Olivares",
        edad: 20,
        carrera: "Ingeniería informática",
        materiasAprobadas: 21
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log("El servidor está corriendo en el puerto " + PORT);
});
