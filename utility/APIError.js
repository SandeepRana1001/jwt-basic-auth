/**
 * Creates a new instance of APIError
 */

class ApiError extends Error {

    /**
     * Generates the API Error With Passed Parameters
     * @param {Integer} statusCode  - Status Code Of The Error
     * @param {String} message  - Error Message You Want To Send
     * @param {Boolean} isResponseRequired  - Add Response to outgoing response if true and false otherwise
     * @param {Object} response  - Response Object You Want To Send Back
     */

    constructor(statusCode, message, isResponseRequired = false, response = {}) {
        super(message);
        this.statusCode = statusCode;
        if (isResponseRequired) {
            this.response = response;
        }
    }
}

module.exports = ApiError;