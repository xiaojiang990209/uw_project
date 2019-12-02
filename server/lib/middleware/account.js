
const HTTP_STATUS = require('../utils/statusCodes');
const ensureLoggedIn = (req, res, next) => (req.user ? next() : res.sendStatus(HTTP_STATUS.UNAUTHORIZED));

module.export = {
    ensureLoggedIn,
};