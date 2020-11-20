const Joi = require('joi');

exports.validation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string().optional().allow(null).allow('').empty(''),
});
