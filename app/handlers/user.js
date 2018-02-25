const faker = require('faker');
const Promise = require('bluebird');

module.exports.create = (request, reply) => {
    request.server.plugins.user.create(request.payload)
        .then((user) => {
            reply(user).code(201);
        })
        .catch(err => reply(err));
};

module.exports.getUsers = (request, reply) => {
    request.server.plugins.user.getAllUsers()
        .then(users => reply(users).code(201))
        .catch(err => reply(err));
};

module.exports.getUser = (request, reply) => {
    request.server.plugins.user.getUser(request.params._id)
        .then((user) => {
            reply(user).code(201);
        })
        .catch(err => reply(err));
};

module.exports.updateUser = (request, reply) => {
    request.server.plugins.user.updateUser(request.params._id, request.payload)
        .then((user) => {
            reply(user).code(201);
        })
        .catch(err => reply(err));
};

module.exports.generateUsers = (request, reply) => {
    let users = [];
    for (let i = 0; i < 10; i++) {
        users.push({
            login : faker.name.firstName(),
            password : faker.internet.password(),
            email : faker.internet.email(),
            firstname : faker.name.firstName(),
            lastname : faker.name.lastName(),
        });
    }
    return Promise.map(users, user => request.server.plugins.user.insert(user));
};

module.exports.deleteUser = (request, reply) => {
    request.server.plugins.user.deleteUser(request.params._id)
        .then(user => reply(user).code(201))
        .catch(err => reply(err));
};

module.exports.login = (request, reply) => {
    request.server.plugins.user.login(request.payload)
        .then(user => reply(user).code(201))
        .catch(err => reply(err));
};

module.exports.resetPassword = (request, reply) => {
    request.server.plugins.user.resetPassword(request.params._id, request.payload.password)
        .then((user) => {
            reply('Password modified !').code(201);
        })
        .catch(err => reply(err));
};
