const path = require('path');
const multer = require('multer');

exports.updateAvatar = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.png`);
    },
  });

  return multer({ storage });
};
