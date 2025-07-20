const Card = require("../models/card");
const NotFoundError = require("../errors/not-found");
const ForbiddenError = require("../errors/forbidden");

const getCards = (req, res, next) => {
  const userId = req.user._id;

  Card.find({})
    .then((cards) => {
      // ✅ Añadido: isLiked para cada tarjeta según si el usuario actual le dio like
      const cardsWithIsLiked = cards.map((card) => {
        const isLiked = card.likes.some(
          (likeId) => likeId.toString() === userId
        );
        return { ...card.toObject(), isLiked };
      });
      res.send(cardsWithIsLiked);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      // ✅ Añadido: isLiked también en la respuesta de creación
      const isLiked = card.likes.includes(req.user._id);
      res.status(201).send({ ...card.toObject(), isLiked });
    })
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
      // ✅ Validación de propietario antes de borrar
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "No tienes permiso para eliminar esta tarjeta"
        );
      }

      return card.deleteOne().then(() => res.send(card));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const userId = req.user._id; // ✅ Corrección: se usa userId, no el ID de la tarjeta

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } }, // ✅ Corrección: se agrega el ID del usuario, no de la tarjeta
    { new: true }
  )
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => {
      // ✅ Añadido: isLiked actualizado en la respuesta
      const isLiked = card.likes.some((likeId) => likeId.toString() === userId);
      res.send({ ...card.toObject(), isLiked });
    })
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
  const userId = req.user._id; // ✅ Corrección: igual que en likeCard

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } }, // ✅ Corrección: se elimina el ID del usuario, no de la tarjeta
    { new: true }
  )
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => {
      // ✅ Añadido: isLiked actualizado tras quitar el like
      const isLiked = card.likes.some((likeId) => likeId.toString() === userId);
      res.send({ ...card.toObject(), isLiked });
    })
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
