const AbstractUWApiService = require('./AbstractUWApiService');
const { TERMS } = require('../../../data/terms.json');

class UWApiInfoSessionService extends AbstractUWApiService {
  constructor(uwClient) {
    super(uwClient);
  }

  getUrlFromRequest(req) {
    const currentTerm = TERMS[TERMS.length - 2]['key'];
    return `/terms/${currentTerm}/infosessions.json`;
  }

  getResponseBodyFromData(data) {
    return data.map((val) => ({
      employer: val.employer,
      description: val.description,
      website: val.website,
      location: `${val.building.code} ${val.building.room}`,
      link: val.link,
      date: val.date.trim(),
      start_time: val.start_time,
      end_time: val.end_time
    }));
  }
}

module.exports = UWApiInfoSessionService;

