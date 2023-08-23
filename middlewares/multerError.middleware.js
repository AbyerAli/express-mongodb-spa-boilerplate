const { MulterError } = require('multer')

module.exports = (err, req, res, next) => {
    if (err instanceof MulterError) {
        res.status(400).send({ err: err.message });
    } else {
        res.sendStatus(500);
    }
}