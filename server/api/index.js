const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');
const router = express.Router();

const {
  scheduleHandler,
  descriptionHandler,
  importantDatesHandler,
  infoSessionHandler,
  newsHandler
} = require('./uwApi');
const { profInfoHandler } = require('./rateMyProf');
const { loginHandler, registerHandler } = require('./user');
const { updateTermHandler } = require('./admin');

router.use('/docs', swaggerUi.serve);

router.get('/schedule/:term/:subject', scheduleHandler);
router.get('/schedule/detail/:subject/:catalog_number', descriptionHandler);
router.get('/importantdates', importantDatesHandler);
router.get('/infosession', infoSessionHandler);
router.get('/rating/:name', profInfoHandler);
router.post('/rating', profInfoListHandler);
router.get('/docs', swaggerUi.setup(swaggerDocument));
router.post('/users/register', registerHandler);
router.post('/users/login', loginHandler);
router.get('/news', newsHandler);
router.post('/admin/update-term', updateTermHandler);

module.exports = router;
