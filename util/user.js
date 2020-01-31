const crypto = require('crypto');

const hashPassword = (password) => {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = crypto.pbkdf2(password, salt, iterations);

    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

const isPasswordCorrect = (savedHash, savedSalt, passwordAttempt) => {
    return savedHash == pbkdf2(passwordAttempt, savedSalt);
}

module.exports = {hashPassword, isPasswordCorrect};