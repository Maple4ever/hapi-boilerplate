'use strict';

const Hapi          = require('hapi');
const plugins       = require('./manifest/plugins');
const routes        = require('./manifest/routes');
const models        = require('./manifest/models');
const serverConfig  = require('./manifest/server');

module.exports.init = () => {
    const server = new Hapi.Server();

    return Promise.resolve().then(() => {
        return serverConfig.init(server);
    }).then(() => {
        // configuration des plugins
        return plugins.init(server);
    }).then(() => {
        // configuration des plugins
        return models.init(server);
    }).then(() => {
        // configuration des routes
        return routes.init(server);
    }).then(() => {
        return server;
    }).catch(err => {
        console.error(err);
    });
};
