const express = require('express');
const router = express.Router();
const { updateAvatar } = require('../avatar/updateAvatar');
const { currentUser, updateUser } = require('./users.controller');
const { authorize } = require('../user/user.controller');

router.get('/current', authorize, currentUser);
router.patch(
  '/avatars',
  authorize,
  updateAvatar().single('avatar'),
  updateUser,
);

module.exports = router;
