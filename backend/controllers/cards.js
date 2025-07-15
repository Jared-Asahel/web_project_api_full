const Card = require("../models/card");
const NotFoundError = require("../errors/not-found");
const ForbiddenError = require("../errors/orbidden");

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
      if (err.name === "ValidationError") {
        const error = new Error("Datos inválidos al crear la tarjeta");
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "No tienes permiso para eliminar esta tarjeta"
        );
      }

      return card
        .deleteOne()
        .then(() => res.send({ message: "Tarjeta eliminada correctamente" }));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.params.cardId },
    },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("ID de tarjeta inválido");
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
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("ID de tarjeta inválido");
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
