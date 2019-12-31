const HTTP_STATUS = require('../../utils/statusCodes');
const ensureLoggedIn = (req, res, next) => (req.body.userId ? next() : res.sendStatus(HTTP_STATUS.UNAUTHORIZED));

module.exports = {
    ensureLoggedIn,
};
