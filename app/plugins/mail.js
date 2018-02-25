'use strict';

const Joi = require('joi');
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

let mailGenerator = new Mailgen({theme: 'neopolitan',
    product: {
        name: 'Test de mail',
        link: 'http://romainguillaumecreations.fr'
    }
});

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'emailnodetest@gmail.com',
        pass: 'emailnodetest123'
    }
}, {
    from: 'emailnodetest@gmail.com',
});

function isValidEmail (address) {
    return Joi.string().email().validate(address);
}

function sendMail(toSend) {
    if (Object.prototype.toString(toSend) == '[object Object]' && isValidEmail(toSend.to)) {
        if (toSend.html || toSend.plaintext) {
            return transporter.sendMail(toSend);
        }
    }
}

function newUser(user) {
    let email = {
        body: {
            name: user.firstname,
            intro: 'Content du mail'
            + 'Login: ' + user.login + ' Password: ' + user.password,
            outro: 'bonne nuit hein'
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailPlainText = mailGenerator.generatePlaintext(email);

    let message = {
        to: user.email,
        subject: 'Subject du mail',
        text: emailPlainText,
        html: emailBody
    };
    sendMail(message);
}

function editedUser(user) {
    let email = {
        body: {
            name: user.firstname,
            intro: 'Intro : user mis à jour',
            outro: 'Lorem ipsum'
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailPlainText = mailGenerator.generatePlaintext(email);
    let message = {
        to: user.email,
        subject: 'Subject',
        text: emailPlainText,
        html: emailBody
    };
    sendMail(message);
}

function resetedPassword(user, pwd) {
    let email = {
        body: {
            name: user.firstname,
            intro: 'Votre nouveau mdp : ' + pwd,
            outro: 'Lorem ipsum'
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailPlainText = mailGenerator.generatePlaintext(email);

    let message = {
        to: user.email,
        subject: 'Votre nouveau mdp',
        text: emailPlainText,
        html: emailBody
    };
    sendMail(message);
}

const mailplugin = {
    register(server, options, next) {
        server.decorate( 'server', 'sendMail', sendMail );
        server.decorate( 'server', 'alertNewUser', newUser );
        server.decorate( 'server', 'alertEditedUser', editedUser );
        server.decorate( 'server', 'sendResetedPassword', resetedPassword );
        next();
    }
};

mailplugin.register.attributes = {
    name: 'mailplugin',
    version: '0.0.999'
};

module.exports = mailplugin;
