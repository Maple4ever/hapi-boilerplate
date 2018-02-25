'use strict';

const handler = require('../handlers/user');
const userSchema = require('../schemas/user');
const login = require('../schemas/login');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'POST',
            path   : '/user',
            config : {
                description : 'Créer un Utilisateur',
                notes       : 'Créer un Utilisateur',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : userSchema,
                },
                handler     : handler.create,
            },
        },
        {
            method : 'GET',
            path   : '/user/all',
            config : {
                description : 'Afficher l\'ensemble des utilisateurs',
                notes       : 'Afficher l\'ensemble des utilisateurs',
                tags        : ['api'],
                handler     : handler.getUsers,
            },
        },
        {
            method : 'GET',
            path   : '/user/{_id}',
            config : {
                description : 'Afficher un utilisateur',
                notes       : 'Afficher un utilisateur',
                tags        : ['api'],
                handler     : handler.getUser,
                validate : {
                    params : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'PUT',
            path   : '/user/{_id}',
            config : {
                description : 'Mettre à jour un utilisateur',
                notes       : 'Mettre à jour un utilisateur',
                tags        : ['api'],
                handler     : handler.updateUser,
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : userSchema,
                    params : {
                        _id : Joi.string().required(),
                    },
                },
            },
        },
        {
            method : 'PUT',
            path   : '/users/generate',
            config : {
                description : 'Génèrer 100 utilisateurs',
                notes       : 'Génère 100 utilisateurs (via la méthode encrypt.js)',
                tags        : ['api'],
                handler     : handler.generateUsers,
            },
        },
        {
            method : 'DELETE',
            path   : '/user/delete/{_id}',
            config : {
                description : 'Supprimer un utilisateur',
                notes       : 'Supprimer un utilisateur',
                tags        : ['api'],
                handler     : handler.deleteUser,
                validate : {
                    params : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'POST',
            path   : '/login',
            config : {
                description : 'Log in',
                notes       : 'Log in',
                tags        : ['api'],
                handler     : handler.login,
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : login,
                },
            },
        },
        {
            method : 'POST',
            path   : '/password/reset/{_id}',
            config : {
                description : 'Reset le mot de passe d\'un utilisateur',
                notes       : 'Reset le mot de passe d\'un utilisateur',
                tags        : ['api'],
                handler     : handler.resetPassword,
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : {
                        password : Joi.string().alphanum().min(8).required(),
                    },
                    params : {
                        _id : Joi.string().alphanum().min(8).required(),
                    },
                },
            },
        },
    ]);
    next();
};

exports.register.attributes = {
    name : 'user-routes',
};
