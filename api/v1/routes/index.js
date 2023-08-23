const router = require("express").Router();

router.use('/user', require('./users/users'));

module.exports = router;