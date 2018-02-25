const Joi = require('joi');

const schema = Joi.object().keys({
    login : Joi.string().required(),
    password : Joi.string().alphanum().min(8).required(),
    email : Joi.string().email().required(),
    firstname : Joi.string().required(),
    lastname : Joi.string().required(),
});

module.exports = schema;