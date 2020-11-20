const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  authorize,
  currentUser,
} = require('./users.controller');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', authorize, logoutUser);
router.get('/current', authorize, currentUser);

module.exports = router;
