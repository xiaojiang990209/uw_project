const passport = require('passport');
const HTTP_STATUS = require('../../utils/statusCodes');

const ensureLoggedIn = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);
      req.user = user;
      next();
  })(req, res, next);
};

module.exports = {
    ensureLoggedIn,
};
