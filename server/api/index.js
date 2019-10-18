const express = require('express');
const router = express.Router();

const { scheduleHandler, descriptionHandler } = require('./course');
const { profInfoHandler } = require('./rateMyProf');
const { loginHandler, registerHandler } = require('./user');

router.get('/schedule/:term/:subject', scheduleHandler);
router.get('/schedule/detail/:subject/:catalog_number', descriptionHandler);
router.get('/rating/:name', profInfoHandler);
router.post('/register', registerHandler);
router.post('/login', loginHandler);

module.exports = router;