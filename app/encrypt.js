var crypto = require('crypto'),
    algorithm = 'sha1';

module.exports = function encryptIUT (toEncrypt) {
    var hash = crypto.createHash(algorithm);
    hash.update(toEncrypt);
    return hash.digest('base64');
}