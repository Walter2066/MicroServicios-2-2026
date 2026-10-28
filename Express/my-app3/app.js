const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Parsear datos de formularios
app.use(express.static("public")); // Servir archivos estáticos
app.set("view engine", "ejs"); // Configurar EJS como motor de plantillas Página principal: listar productos
app.get("/", (req, res) => {
  const query = "SELECT * FROM Productos";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render("index", { productos: results });
  });
});
// Mostrar formulario para agregar producto
app.get("/add", (req, res) => {
  res.render("add");
});
// Procesar formulario para agregar producto
app.post("/add", (req, res) => {
  const { Nombre, Precio, Stock } = req.body;
  const query = "INSERT INTO Productos (Nombre, Precio,Stock) VALUES (?, ?, ?)";
  db.query(query, [Nombre, Precio, Stock], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("/");
  });
});
// Mostrar formulario para editar producto
app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Productos WHERE Id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render("edit", { producto: results[0] });
  });
});
// Procesar formulario para editar producto
app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { Nombre, Precio, Stock } = req.body;
  const query =
    "UPDATE Productos SET Nombre = ?, Precio = ?, Stock = ? WHERE Id = ?";
  db.query(query, [Nombre, Precio, Stock, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("/");
  });
});
// Eliminar producto
app.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Productos WHERE Id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("/");
  });
});
// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
