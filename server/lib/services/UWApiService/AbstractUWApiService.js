const _ = require('lodash');
const HTTP_STATUS = require('../../../utils/statusCodes');

class AbstractUWApiService {
  constructor(uwClient) {
    this.client = uwClient;
  }

  handleRequest() {
    return (req, res) => {
      this.client.get(this.getUrlFromRequest(req), (err, resp) => {
        if (!err && resp.meta.status === HTTP_STATUS.OK && !_.isEmpty(resp.data)) {
          res.json(this.getResponseBodyFromData(resp.data));
        } else {
          res.status(HTTP_STATUS.NOT_FOUND).json(this.getErrMsgFromData(resp.data));
        }
      });
    }
  }

  getUrlFromRequest(req) {
    throw "Not implemented";
  }

  getResponseBodyFromData(data) {
    throw "Not implemented";
  }

  getErrMsgFromData(data) {
    return ({ err: true, data });
  }
}

module.exports = AbstractUWApiService;

