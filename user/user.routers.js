const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  authorize,
  currentUser,
} = require('./user.controller');
const { generateAvatar } = require('../avatar/generateAvatar');

router.post('/login', loginUser);
router.post('/register', generateAvatar, registerUser);
router.post('/logout', authorize, logoutUser);

module.exports = router;
