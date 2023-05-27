const httpStatus = require("http-status");
const jwt = require('jsonwebtoken');
const { SECRET } = require('../configuration/config') // Replace with your own secret key
const TOKEN_UTILS = require('../utility/token');
const ApiError = require("../utility/APIError");
const token_utility = new TOKEN_UTILS()

// const checkRefreshToken = (refreshToken) => {

//     if (!refreshToken) {
//         return res.status(403).json({ message: 'Invalid token.' });
//     }
//     refreshToken = refreshToken.split('Refresh ')[1];

// }

const authenticateToken = (req, res, next) => {

    // Token is typically sent in the Authorization header
    let token = req.headers.authorization;
    let refreshToken = req.headers['x-refresh-token'];

    if (!token || !refreshToken) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'You are not authorized to access this url' });
    }

    token = token.split('Bearer ')[1];
    refreshToken = refreshToken.split('Refresh ')[1];

    const decodedToken = token_utility.validateToken(token)

    if (!decodedToken) {
        const refreshDecodedToken = token_utility.validateToken(refreshToken)
        if (!refreshDecodedToken) {
            throw new ApiError(401, 'Invalid token provided')
        } else {
            const _id = refreshDecodedToken._id
            const newToken = token_utility.createToken({ _id }, '1h')
            // Add the user ID to the request object for further use
            req.userId = _id;
            req.token = newToken; // Attach the new token to the request object
        }
    } else {

        const _id = decodedToken._id
        // Add the user ID to the request object for further use
        req.userId = _id;
        req.token = token; // Attach the new token to the request object
    }
    req.refreshToken = refreshToken
    next();
};

module.exports = authenticateToken;
