const Joi = require('joi');

exports.validation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
