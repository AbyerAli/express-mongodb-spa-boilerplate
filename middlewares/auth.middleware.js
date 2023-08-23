const jwt = require('jsonwebtoken')
const { accessTokenSecret } = require('../config/config')
const accessLog = require("simple-node-logger").createSimpleLogger({
    logFilePath: "./log/access/" + new Date().toLocaleDateString().split("/").join("-") + ".log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})
const { failResponse } = require('../helpers/methods')

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.verifyToken = (req, res, next) => {
    let reqObject = {
        method: req.method,
        path: req.path,
        param: req.params,
        body: req.body
    }
    let resObject = {
        statusCode: res.statusCode
    }
    accessLog.info(
        JSON.stringify({
            reqObject,
            resObject
        })
    )
    let authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized'
        })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        accessTokenSecret,
        (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'Unauthorized'
                })
            } else {
                req.decodedToken = decoded;
                accessLog.info(decoded._id, " user requested secure route")
                next()
            }
        }
    )
}