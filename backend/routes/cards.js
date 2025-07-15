const express = require("express");
const {
  validateCreateCard,
  validateCardId,
} = require("../middlewares/validators");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const router = express.Router();

router.get("/", getCards);
router.post("/", express.json(), validateCreateCard, createCard);
router.delete("/:cardId", validateCardId, deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
