const express = require("express");
const {
  validateUpdateUser,
  validateUpdateAvatar,
} = require("../middlewares/validators");

const router = express.Router();
const {
  getUsers,
  getUsersById,
  updateAvatar,
  updateUser,
  getCurrentUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUser, updateUser);
router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);
router.get("/:userId", getUsersById);

module.exports = router;
