const AbstractUWApiService = require('./AbstractUWApiService');

class UWApiSubjectService extends AbstractUWApiService {
  constructor(uwClient) {
    super(uwClient);
  }

  getUrlFromRequest(req) {
    return '/codes/subjects.json';
  }

  getResponseBodyFromData(data) {
    return data.map(element => ({
      subject: element.subject,
      description: element.description
    }))
  }
}

module.exports = UWApiSubjectService;

