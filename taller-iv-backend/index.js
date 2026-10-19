const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ message: "El servidor está funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log("El servidor está corriendo en el puerto " + PORT);
});
