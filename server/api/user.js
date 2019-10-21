const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
    validateRegisterInput,
    validateLoginInput,
    createAuthResponse,
    createUser
} = require('../utils/userUtils');
const HTTP_STATUS = require('../utils/statusCodes');

const loginHandler = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);

    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Email not found'});
        bcrypt.compare(password, user.password)
          .then(match => {
            if (!match) {
              return res.status(HTTP_STATUS.BAD_REQUEST).json({ passwordIncorrect: 'Password incorrect'});
            }
            createAuthResponse(user)
              .then(auth => res.json(auth))
              .catch(err => res.status(HTTP_STATUS.BAD_REQUEST).json(err));
          })
      })
}

const registerHandler = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
    }
    const { name, email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({ email: 'Email already exists'});
        }
        const newUser = createUser(name, email, password);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                createAuthResponse(user)
                  .then(auth => res.json(auth))
                  .catch(err => res.status(HTTP_STATUS.BAD_REQUEST).json(err));
              })
              .catch(err => console.log(err));
          })
        })
      })
}

module.exports = {
    loginHandler,
    registerHandler
}
