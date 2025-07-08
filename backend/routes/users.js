const express = require('express');

const router = express.Router();
const {
  getUsers,
  getUsersById,
  createUser,
  updateAvatar,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.post('/', express.json(), createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
