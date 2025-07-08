const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error(err.message);
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID del usuario inválido');
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
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') res.statusCode(400);
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Datos del avatar inválidos');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateAvatar,
  updateUser,
};
