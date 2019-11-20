// TODO: Make a wrapper object for uwapi with API key embedded in
const uwapi = require('uwaterloo-api');
const uwClient = new uwapi({ API_KEY: process.env.UW_API_SECRET});
const { transformNewsResponse, isNullOrEmpty } = require('../../utils');
const HTTP_STATUS = require('../../utils/statusCodes');

const newsHandler = (req, res) => {
  uwClient.get('news.json', (err, resp) => {
    if (!err && resp.meta.status == HTTP_STATUS.OK && !isNullOrEmpty(resp.data)) {
      res.json(transformNewsResponse(resp.data));
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json(err);
    }
  });
};

module.exports = newsHandler;