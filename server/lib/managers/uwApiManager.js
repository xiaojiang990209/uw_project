const uwapi = require('uwaterloo-api');
const uwClient = new uwapi({ API_KEY: process.env.UW_API_SECRET });

const {
  UWApiCourseService,
  UWApiCourseDescriptionService,
  UWApiInfoSessionService,
  UWApiNewsService,
  UWApiScheduleService,
  UWApiSubjectService,
} = require('../services/UWApiService');

const scheduleHandler = new UWApiScheduleService(uwClient).handleRequest();
const descriptionHandler = new UWApiCourseDescriptionService(uwClient).handleRequest();
const subjectsHandler = new UWApiSubjectService(uwClient).handleRequest();
const coursesHandler = new UWApiCourseService(uwClient).handleRequest();
const infoSessionHandler = new UWApiInfoSessionService(uwClient).handleRequest();
const newsHandler = new UWApiNewsService(uwClient).handleRequest();

module.exports = {
    scheduleHandler,
    descriptionHandler,
    subjectsHandler,
    infoSessionHandler,
    newsHandler,
    coursesHandler
};
