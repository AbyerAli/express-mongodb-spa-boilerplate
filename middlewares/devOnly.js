const { env } = require("../config/config")

module.exports = (req, res, next) => {
    if(!env.isDevelopment) {
        return res.send('404 not found')
    }
    next()
}