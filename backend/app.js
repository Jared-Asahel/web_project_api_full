// Importación de módulos
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");

// Middlewares, rutas y controladores
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/not-found"); // mejor usar destructuring si exportas varios
const { createUser } = require("./controllers/users");
const { login } = require("./controllers/login");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validators");

const app = express();
const { PORT = 3000 } = process.env;

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Rutas públicas
app.post("/signup", validateCreateUser, createUser); // Registro
app.post("/signin", validateLogin, login); // Login

// Middleware de autorización (protege las rutas siguientes)
app.use(auth);

// Rutas protegidas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta no encontrada (para cualquier otra URL)
app.use("*", (req, res, next) => {
  next(new NotFoundError("Recurso no encontrado"));
});

// Errores de Celebrate (validación)
app.use(errors());

// Middleware de manejo de errores general
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Error interno del servidor" : message,
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
