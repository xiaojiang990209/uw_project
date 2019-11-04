const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');
const router = express.Router();

const {
  scheduleHandler,
  descriptionHandler,
  importantDatesHandler,
  infoSessionHandler
} = require('./uwApi');
const { profInfoHandler } = require('./rateMyProf');
const { loginHandler, registerHandler } = require('./user');

router.use('/docs', swaggerUi.serve);

router.get('/schedule/:term/:subject', scheduleHandler);
router.get('/schedule/detail/:subject/:catalog_number', descriptionHandler);
router.get('/importantdates', importantDatesHandler);
router.get('/infosession', infoSessionHandler);
router.get('/rating/:name', profInfoHandler);
router.get('/docs', swaggerUi.setup(swaggerDocument));
router.post('/users/register', registerHandler);
router.post('/users/login', loginHandler);

module.exports = router;
