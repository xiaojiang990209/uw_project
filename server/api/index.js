const express = require('express');
const router = express.Router();

const { scheduleHandler, descriptionHandler } = require('./course');
const { profInfoHandler } = require('./rateMyProf');
const users = require('./users');

router.get('/schedule/:term/:subject', scheduleHandler);
router.get('/schedule/description/:name', descriptionHandler);
router.get('/rating/:name', profInfoHandler);
router.use('/users', users);

module.exports = router;