const usersSchema = require('./users.models');

exports.currentUser = async (req, res) => {
  const {
    user: { email, subscription },
  } = req;
  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

exports.updateUser = async (req, res) => {
  const {
    file,
    body,
    user: { _id },
  } = req;
  try {
    const avatarUrl = `http://localhost:${process.env.PORT}/images/${file.filename}`;

    await usersSchema.findByIdAndUpdate(
      _id,
      {
        avatarURL: avatarUrl,
        ...body,
      },
      { new: true },
    );

    res.status(200).json({
      avatarURL: `${avatarUrl}`,
      ...body,
    });
  } catch (err) {
    res.status(404).json({ message: 'Not authorized' });
  }
};
