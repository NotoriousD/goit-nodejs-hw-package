const bcryptjs = require('bcryptjs');
const usersSchema = require('./user.models');
const { validation } = require('./user.validation');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

exports.registerUser = async (req, res, next) => {
  const {
    body: { email, password },
    avatarURL: { url, name },
  } = req;
  //validation user data
  const { error } = validation.validate(req.body);

  if (error) {
    return res.status(404).json(error);
  }

  try {
    // check if email already exist
    const emailExist = await usersSchema.findOne({ email: email });

    console.log(emailExist);

    if (emailExist) {
      return res.status(409).json({ message: 'Email in use' });
    }
    // salted password
    const hashedPassword = await bcryptjs.hash(password, 10);

    await fsPromises.copyFile(
      path.join(__dirname, `../temp/${name}`),
      path.join(__dirname, `../public/images/${name}`),
    );

    await fsPromises.unlink(path.join(__dirname, `../temp/${name}`));

    // registration new user
    const registrationUser = await usersSchema.create({
      ...req.body,
      password: hashedPassword,
      avatarURL: url,
    });

    if (registrationUser.length === 0) {
      return res.status(404).send({ message: 'Registration failed' });
    }

    res.status(200).json(registrationUser);
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  const { error } = validation.validate(req.body);

  if (error) {
    return res.status(401).json(error);
  }

  const user = await usersSchema.findOne({ email });

  if (!user) {
    return res.status(401).send('Email or password is wrong');
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send('Email or password is wrong');
  }

  const token = await jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
  );

  await usersSchema.findByIdAndUpdate(user._id, { token: token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

exports.logoutUser = async (req, res) => {
  const {
    user: { _id },
  } = req;

  try {
    const logout = await usersSchema.findByIdAndUpdate(_id, { token: '' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.authorize = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await usersSchema.findById(payload.userId);
    console.log(user);
    req.user = user;
  } catch (err) {
    return res.status(403).json({
      message: 'Not authorized',
    });
  }

  next();
};
