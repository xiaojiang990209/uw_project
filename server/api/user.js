const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const {
    validateRegisterInput,
    validateLoginInput,
    createJwtPayload,
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
            if (!user) return res.status(HTTP_STATUS.NOT_FOUND).json({ emailNotFound: 'Email not found'});
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        return res.status(HTTP_STATUS.BAD_REQUEST).json({ passwordIncorrect: 'Password incorrect'});
                    }
                    const payload = createJwtPayload(user);
                    // TODO: Define timeout as environment variable or constants
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 300 }, (err, token) => {
                        if (err) return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
                        return res.json(createAuthResponse(token));
                    })
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
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        })
}

module.exports = {
    loginHandler,
    registerHandler
}