const express = require('express');
const app = express();
const port = 3000;
// Middleware para manejar datos en formato JSON
app.use(express.json());
// Rutas básicas
app.get('/', (req, res) => {
 res.send('Bienvenido a mi aplicación con Express');
});
app.post('/usuario', (req, res) => {
 const { nombre, edad } = req.body;
 res.send(`Usuario creado: ${nombre}, Edad: ${edad}`);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor 2 escuchando en http://localhost:${port}`);
});