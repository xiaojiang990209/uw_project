const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');
const router = express.Router();

const managers = require('../lib/managers');
const validators = require('../lib/Validator');

const { updateTermHandler, getTermHandler } = require('./term');
router.use('/docs', swaggerUi.serve);

router.get('/schedule/detail/:subject/:catalog_number', managers.uwApi.descriptionHandler);

router.get('/schedule/:term/:subject', managers.uwApi.scheduleHandler);
router.get('/schedule/:term/:subject/:catalog_number', managers.uwApi.scheduleHandler);

router.get('/importantdates', managers.uwApi.importantDatesHandler);

router.get('/infosession', managers.uwApi.infoSessionHandler);

router.get('/rating/:name', managers.rateMyProf.profInfoHandler);
router.post('/rating', managers.rateMyProf.profInfoListHandler);

router.get('/docs', swaggerUi.setup(swaggerDocument));

router.post('/users/register', managers.user.registerHandler);
router.post('/users/login', managers.user.loginHandler);

router.get('/news', managers.news);

router.put('/terms', updateTermHandler);
router.get('/terms', getTermHandler);

router.post('/matchable/current-groups', validators.matchable.currentGroupValidator,  managers.matchable.fetchGroupHandler);//fetching existing groups, post because we need body
router.post('/matchable/groups', validators.matchable.registerGroupValidator,  managers.matchable.registerGroupHandler);//register a new group
router.post('/matchable/update-group', managers.matchable.updateGroupHandler);//join a new group
router.get('/library/dates', managers.library.getDatesHandler);
router.get('/library/buildings', managers.library.getBuildingHandler);
router.get('/library/rooms', managers.library.getRoomHandler);

module.exports = router;
