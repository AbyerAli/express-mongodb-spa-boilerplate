const methods = require("../helpers/methods")
const { env } = require('../config/config')
const errorLog = require("simple-node-logger").createSimpleLogger({
    logFilePath: "./log/error/" + new Date().toLocaleDateString().split("/").join("-") + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})
/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
    errorLog.error(error.message)
    console.trace(error)
    return res.status(error.statusCode || 500).send(env.isDevelopment ? methods.failResponse(error.message) : methods.failResponse('Something went wrong!'))
}
