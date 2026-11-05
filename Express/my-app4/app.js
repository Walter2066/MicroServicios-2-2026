const express = require("express");
const { DataSource } = require("typeorm");
const { User } = require("./entity/User"); // Tu entidad en JS
// Configuración de la conexión
const AppDataSource = new DataSource({
  type: "mysql", // o postgres, sqlite, etc.
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "bd_ventas",
  synchronize: true,
  logging: false,
  entities: [User],
});
AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");
    const app = express();
    app.use(express.json());
    // GET - Obtener usuarios
    app.get("/users", async (req, res) => {
      try {
        const users = await AppDataSource.manager.find(User);
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
      }
    });
    // POST - Crear usuario
    app.post("/users", async (req, res) => {
      try {
        const userRepository = AppDataSource.getRepository(User);

        const user = userRepository.create({
          name: req.body.name,
          email: req.body.email,
        });

        await userRepository.save(user);

        res.json({ message: "Usuario creado" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear usuario" });
      }
    });

    // PUT - Actualizar usuario
    app.put("/users/:id", async (req, res) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({
          id: parseInt(req.params.id),
        });
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        await userRepository.save(user);
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
      }
    });
    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  })
  .catch((error) => console.log("Error de conexión:", error));
