import express from "express";
import path from "path";
import candidatoRoutes from "./routes/candidatoRoutes.js";
import { AppDataSource } from "./config/data-source.js";

const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "./src/views"));

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión exitosa a la Base de datos.");

    app.get("/", (req, res) => {
      res.render("index");
    });
    app.use("/candidatos", candidatoRoutes);

    // Una vez conectada la BD, levantamos el servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
