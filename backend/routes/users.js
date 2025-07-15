const express = require("express");

const router = express.Router();
const {
  getUsers,
  getUsersById,
  updateAvatar,
  updateUser,
  getCurrentUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUsersById);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
