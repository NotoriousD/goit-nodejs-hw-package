const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  email: String,
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: String,
});

module.exports = mongoose.model('user', usersSchema);
