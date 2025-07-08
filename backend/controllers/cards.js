const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Datos inválidos al crear la tarjeta');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ message: 'Tarjeta eliminada', card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.params.cardId },
    },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.params.cardId },
    },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
