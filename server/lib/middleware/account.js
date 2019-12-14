
const HTTP_STATUS = require('../../utils/statusCodes');
const ensureLoggedIn = (req, res, next) => (req.body.user ? next() : res.sendStatus(HTTP_STATUS.UNAUTHORIZED));

module.exports = {
    ensureLoggedIn,
};