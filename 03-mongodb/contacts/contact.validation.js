const { string } = require('joi');
const Joi = require('joi');

exports.validation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string(),
});
