const request = require('request');
const HTTP_STATUS = require('../../../utils/statusCodes');

class RequestFactory {
  static handler(resolve, reject) {
    return (err, res, body) => {
      if (!err) {
        return resolve(body);
      }
      return reject(err);
    }
  }

  static get(url) {
    return new Promise((resolve, reject) => {
      request.get(url, RequestFactory.handler(resolve, reject));
    });
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      request.post(url, data, RequestFactory.handler(resolve, reject));
    });
  }
}

module.exports = RequestFactory;

