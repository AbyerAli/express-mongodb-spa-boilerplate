const rateLimit = require('express-rate-limit')

module.exports = {
    globalLimiter: rateLimit({
        windowMs: 2000, // 2 seconds
        max: 50, // Limit each IP to 50 requests per `window` (here, per 2 seconds)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
}