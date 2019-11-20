const request = require('request');
const HTTP_STATUS = require('../utils/statusCodes');

// Checks if an object is undefined, null, or empty (in terms of both array and object)
isNullOrEmpty = obj => 
    !obj || 
    (obj instanceof Object && Object.keys(obj).length === 0) ||
    (obj instanceof Array && obj.length === 0);

// A wrapper around request module to enable async/await
requestWrapper = (method, url, data={}) => {
  return new Promise((resolve, reject) => {
    const responseHandler = (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err);
      }
    };

    switch(method) {
      case "GET": request.get(url, responseHandler); break;
      case "POST": request.post(url, data, responseHandler); break;
    }
  })
};

module.exports = {
  isNullOrEmpty,
  requestWrapper
};