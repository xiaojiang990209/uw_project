const uwapi = require('uwaterloo-api');
const uwClient = new uwapi({ API_KEY: process.env.UW_API_SECRET });
const {
    transformScheduleResponse,
    paramToScheduleURL,
    transformSubjectsResponse,
    paramToSubjectsURL,
    transformDescriptionResponse,
    paramToDescriptionURL,
    transformCoursesResponse,
    paramToCoursesURL,
    transformImportantDatesResponse,
    paramToImportantDatesURL,
    transformInfoSessionResponse,
    paramToInfoSessionURL,
    transformNewsResponse,
    paramToNewsURL,
    isNullOrEmpty
} = require('../../utils');
const HTTP_STATUS = require('../../utils/statusCodes');

const baseUwGetHandler = (urlGetter, successTransformer) => (req, res) => {
  uwClient.get(urlGetter(req), (err, resp) => {
    if (!err && resp.meta.status === HTTP_STATUS.OK && !isNullOrEmpty(resp.data)) {
      res.json(successTransformer(resp.data));
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({ err: true });
    }
  })
};

const scheduleHandler = baseUwGetHandler(paramToScheduleURL, transformScheduleResponse);
const descriptionHandler = baseUwGetHandler(paramToDescriptionURL, transformDescriptionResponse);
const subjectsHandler = baseUwGetHandler(paramToSubjectsURL, transformSubjectsResponse);
const coursesHandler = baseUwGetHandler(paramToCoursesURL, transformCoursesResponse);
const importantDatesHandler = baseUwGetHandler(paramToImportantDatesURL, transformImportantDatesResponse);
const infoSessionHandler = baseUwGetHandler(paramToInfoSessionURL, transformInfoSessionResponse);
const newsHandler = baseUwGetHandler(paramToNewsURL, transformNewsResponse);

module.exports = {
    scheduleHandler,
    descriptionHandler,
    subjectsHandler,
    importantDatesHandler,
    infoSessionHandler,
    newsHandler,
    coursesHandler
};
