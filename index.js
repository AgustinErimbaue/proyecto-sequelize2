const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware de registro de solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rutas de la aplicación
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
