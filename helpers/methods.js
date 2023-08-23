const accessLog = require("simple-node-logger").createSimpleLogger({
    logFilePath: "./log/access/" + new Date().toLocaleDateString().split("/").join("-") + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})

/**
 * @type {SimpleNodeLogger}
 * @description: Logger for the application.
 * @example: logger.info('Hello World!');
 * @returns {void}
 * @see: https://www.npmjs.com/package/simple-node-logger
 * @see: https://www.npmjs.com/package/simple-node-logger#log-levels
*/
exports.logger = accessLog;


/**
 *
 * @param message
 * @param payload
 * @returns {{data, message, status: boolean}}
 */
exports.successResponse = (message = '', payload) => {
    return {
        status: true,
        message: message,
        data: payload
    }
}

/**
 *
 * @param message
 * @param payload
 * @returns {{message, status: boolean}}
 */
exports.failResponse = (message = '', payload = null) => {
    let response = {
        status: false,
        message: message
    }

    if (payload) {
        response.payload = payload
    }

    return response
}