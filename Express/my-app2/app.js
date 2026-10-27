const express = require("express");
const app = express();
const port = 3000;
// Configuramos EJS como motor de plantillas
app.set("views", "./views");
app.set("view engine", "ejs");
// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: false }));
// Ruta para mostrar el formulario
app.get("/", (req, res) => {
  res.render("index");
});
// Ruta para generar la tabla
app.post("/generarTabla", (req, res) => {
  const numFilas = parseInt(req.body.filas);
  const numColumnas = parseInt(req.body.columnas);
  // Generar la tabla en formato HTML
  let tabla = "<table>";
  for (let i = 0; i < numFilas; i++) {
    tabla += "<tr>";
    for (let j = 0; j < numColumnas; j++) {
      tabla += "<td>Celda</td>";
    }
    tabla += "</tr>";
  }
  tabla += "</table>";
  res.render("resultado", { tabla });
});
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
