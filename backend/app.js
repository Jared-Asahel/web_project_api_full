const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "683cf9aa88d8f5b7ba10fe1b",
  };

  next();
});

app.use(express.json());
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

// Middleware de errores centralizado
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Error del servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
