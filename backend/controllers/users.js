const User = require("../models/user");
const bcrypt = require("bcryptjs");
const NotFoundError = require("../errors/not-found");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!password) {
    return next(new Error("La contraseña es obligatoria"));
  }

  if (!email) {
    const error = new Error("El correo es obligatorio");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(201).send({ _id: user._id, email: user.email });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.statusCode = 400;
    } else if (err.code === 11000) {
      err.statusCode = 409;
      err.message = "El correo ya está registrado";
    }
    next(err);
  }
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("ID del usuario inválido");
        error.statusCode = 400;
        next(error);
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") res.statusCode(400);
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Datos del avatar inválidos");
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario no encontrado");
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateAvatar,
  updateUser,
  getCurrentUser,
};
