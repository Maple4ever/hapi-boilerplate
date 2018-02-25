'use strict';

const Promise   = require('bluebird');
const user = require('../models/user');
const internals = {};

const externals = {
    getAllUsers() {
        return internals.server.database.user.find();
    },
    getUser(id) {
        return internals.server.database.user.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return user;
            });
    },
    deleteUser(id) {
        return internals.server.database.user.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return internals.server.database.user.remove({ _id : id })
                    .then(value => 'Utilisateur supprimé');
            });
    },
    create(payload) {
        let user = internals.server.database.user();
        user.set(payload);
        return user.save();
    },
    insert(user) {
        let newUser = internals.server.database.user();
        newUser.set(user);
        newUser.save();
    },
    updateUser(id, payload) {
        return internals.server.database.user.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                user.set(payload);
                user.save();
                return user;
            });
    },
    login(payload) {
        payload.password = encrypt(payload.password);
        return internals.server.database.user.findOne({ login : payload.login, password : payload.password })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return 'Connected !';
            });
    },
    resetPassword(id, password) {
        password = encrypt(password);
        return internals.server.database.user.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return internals.server.database.user.update({ _id : id }, { password })
                    .then(status => user);
            });
    },
    register(server, options, next) {
        internals.server    = server.root;
        internals.settings  = options;

        // à répéter autant de fois
        // que vous avez de méthodes publiques
        server.expose('getAllUsers', externals.getAllUsers);
        server.expose('getUser', externals.getUser);
        server.expose('create', externals.create);
        server.expose('insert', externals.insert);
        server.expose('updateUser', externals.updateUser);
        server.expose('deleteUser', externals.deleteUser);
        server.expose('login', externals.login);
        server.expose('resetPassword', externals.resetPassword);

        next();
    },
};

externals.register.attributes = {
    name    : 'user',
};

module.exports.register = externals.register;
