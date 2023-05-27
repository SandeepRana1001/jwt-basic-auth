const jwt = require('jsonwebtoken');
const { SECRET } = require('../configuration/config');
const ApiError = require('./APIError');

class TOKEN_UTILS {

    /**
     * Generates a token for authentication 
     * @param {Object} payload  - The Data you wish to retrieve from the server
     * @param {String} expires  - The expiration date/time of the token
     */

    createToken = (payload, expires) => {
        const token = jwt.sign(payload, SECRET, { expiresIn: expires });
        return token
    }

    /**
         * Generates a refresh token with longer expiration time
         * @param {Object} payload  - The Data you wish to retrieve from the server
         * @param {String} expires  - The expiration date/time of the token
    */

    createRefreshToken = (payload, expires) => {
        return this.createToken(payload, expires)
    }

    /**
         * Generates a refresh token with longer expiration time
         * @param {token} token  - The Token you want to validate
         * @param {Object} decoded  - The decoded data
         * @throws {Error} - If Invalid Token
   */

    validateToken = (token) => {
        let decodedToken = '';
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                decodedToken = false
            } else {
                decodedToken = decoded
            }
        })
        return decodedToken
    }

}

module.exports = TOKEN_UTILS