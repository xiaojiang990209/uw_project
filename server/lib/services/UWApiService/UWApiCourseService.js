const AbstractUWApiService = require('./AbstractUWApiService');

class UWApiCourseService extends AbstractUWApiService {
  constructor(uwClient) {
    super(uwClient);
  }

  getUrlFromRequest(req) {
    return `/courses/${req.params.subject}.json`;
  }

  getResponseBodyFromData(data) {
    return data;
  }
}

module.exports = UWApiCourseService;

