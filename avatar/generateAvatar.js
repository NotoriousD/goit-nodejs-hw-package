const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const AvatarGenerator = require('avatar-generator');

exports.generateAvatar = async (req, res, next) => {
  try {
    const avatar = new AvatarGenerator({
      //All settings are optional.
      parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'], //order in which sprites should be combined
      partsLocation: path.join(
        __dirname,
        '../node_modules/avatar-generator/img',
      ), // path to sprites
      imageExtension: '.png', // sprite file extension
    });
    const variant = 'female'; // By default 'male' and 'female' supported
    const name = `${Date.now()}.png`;
    const image = await avatar.generate(name, variant);
    // Now `image` contains sharp image pipeline http://sharp.pixelplumbing.com/en/stable/api-output/
    // you can write it to file
    image.png().toFile(path.join(__dirname, `../temp/${name}`));

    req.avatarURL = {
      name: name,
      url: `http://localhost:${process.env.PORT}/images/${name}`,
    };

    next();
  } catch (err) {
    console.log(err);
  }
};
