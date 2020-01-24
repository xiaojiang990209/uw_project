const Validator = require('validator');
const isEmpty = require('is-empty');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = data => {
  let errors = {};

  // Convert empty fields to empty strings first
  if (isEmpty(data.name)) data.name = "";
  if (isEmpty(data.email)) data.email = "";
  if (isEmpty(data.password)) data.password = "";
  if (isEmpty(data.confirmPassword)) data.confirmPassword = "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.password2 = "Confirm password is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const validateLoginInput = data => {
  let errors = {};

  if (isEmpty(data.email)) data.email = "";
  if (isEmpty(data.password)) data.password = "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const createUser = (name, email, password) => new User({
  name,
  email,
  password,
});

const createJwtPayload = user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  joined: user.date,
  favouriteCourses: user.favouriteCourses
});

const createAuthResponse = (user) => {
  return new Promise((resolve, reject) => {
    const payload = createJwtPayload(user);
    jwt.sign(payload, keys.secretOrKey, { expiresIn: '24h' }, (err, token) => {
      if (err) reject({ error: err });
      resolve({ success: true, token: token });
    })
  })
};

module.exports = {
    validateRegisterInput,
    validateLoginInput,
    createUser,
    createAuthResponse,
}
