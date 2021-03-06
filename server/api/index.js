const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');
const router = express.Router();

const managers = require('../lib/managers');
const validators = require('../lib/Validator');
const middleware = require('../lib/middleware');

const passport = require('passport');

router.use('/docs', swaggerUi.serve);

router.get('/schedule/detail/:subject/:catalog_number', managers.uwApi.descriptionHandler);
router.get('/schedule/courses/:subject', middleware.caching.cacheChecking, managers.uwApi.coursesHandler);
router.get('/schedule/subjects', managers.uwApi.subjectsHandler);
router.get('/schedule/:term/:subject', managers.uwApi.scheduleHandler);
router.get('/schedule/:term/:subject/:catalog_number', middleware.caching.cacheChecking, managers.uwApi.scheduleHandler);
router.get('/infosession',  middleware.caching.cacheChecking, managers.uwApi.infoSessionHandler);

router.get('/rating/:name', managers.rateMyProf.profInfoHandler);
router.post('/rating', managers.rateMyProf.profInfoListHandler);

router.get('/docs', swaggerUi.setup(swaggerDocument));

router.post('/users/register', managers.user.registerHandler);
router.post('/users/login', managers.user.loginHandler);
router.put('/users/favouriteCourses', middleware.account.ensureLoggedIn, managers.user.favouriteCoursesHandler);

router.get('/news',  middleware.caching.cacheChecking, managers.uwApi.newsHandler);

router.put('/terms',  managers.terms.updateTermHandler);
router.get('/terms', managers.terms.getTermHandler);

//Matchable
router.get('/matchable/groups', middleware.account.ensureLoggedIn, managers.matchable.fetchGroupsHandler);//fetching existing groups
router.get('/matchable/groups/:subject', middleware.account.ensureLoggedIn, managers.matchable.fetchBySubjectHandler);//fetching existing groups
router.post('/matchable/groups', middleware.account.ensureLoggedIn,  managers.matchable.registerGroupHandler);//register a new group
router.patch('/matchable/groups/:groupId', middleware.account.ensureLoggedIn, managers.matchable.patchGroupHandler);//join a new group
router.get('/matchable/group/:groupId',  middleware.account.ensureLoggedIn, managers.matchable.getOneGroupHandler);
router.post('/matchable/groups/:groupId/posts', middleware.account.ensureLoggedIn, managers.matchable.updatePostsHandler);//posting a post
router.get('/matchable/groups/user/:userId', middleware.account.ensureLoggedIn, managers.matchable.getUserGroupHandler);//posting a post

router.get('/library/dates', managers.library.getDatesHandler);
router.get('/library/buildings', managers.library.getBuildingHandler);
router.get('/library/rooms', managers.library.getRoomHandler);

router.get('/posts', managers.fbGroupPost.getFBGroupPosts);
module.exports = router;
