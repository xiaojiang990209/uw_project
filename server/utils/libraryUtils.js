const cheerio = require('cheerio');
const { requestWrapper } = require('./globalUtils');
const { UW_LIB_BOOKING_URL } = require('./constants');

const getDatesJson = () => new Promise((resolve, reject) => {
  requestWrapper('GET', UW_LIB_BOOKING_URL)
    .then(cheerio.load)
    .then(collectDates)
    .then(resolve)
    .catch(reject);
});

const collectDates = ($) => {
  const dates = [];
  $('#dayChanger option').each((i, op) => dates.push($(op).text().trim()));
  return { dates };
}

module.exports = {
  getDatesJson
}