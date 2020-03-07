const AbstractUWApiService = require('./AbstractUWApiService');

class UWApiCourseDescriptionService extends AbstractUWApiService {
  constructor(uwClient) {
    super(uwClient);
  }

  getUrlFromRequest(req) {
    return `/courses/${req.params.subject}/${req.params.catalog_number}.json`;
  }

  getResponseBodyFromData(data) {
    return data;
  }
}

module.exports = UWApiCourseDescriptionService;

