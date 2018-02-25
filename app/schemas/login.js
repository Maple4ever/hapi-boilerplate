const Joi = require('joi');

const login = Joi.object().keys({
    login : Joi.string().required(),
    password : Joi.string().alphanum().min(8).required(),
});

module.exports = login;
