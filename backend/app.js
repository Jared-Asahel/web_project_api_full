// Importación de módulos
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const { errors } = require("celebrate");

// Middlewares, rutas y controladores
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const errorHandler = require("./errors/error-handler");
const { createUser } = require("./controllers/users");
const { login } = require("./controllers/login");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validators");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3000 } = process.env;

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.options("/*splat", cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(requestLogger);

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

app.use(errorLogger);

// Errores de Celebrate (validación)
app.use(errors());

// Para cualquier ruta no encontrada, devolver index.html
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Middleware de manejo de errores general
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
