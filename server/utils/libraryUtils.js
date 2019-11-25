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

const getBuildingJson = () => new Promise((resolve, reject) => {
  requestWrapper('GET', UW_LIB_BOOKING_URL)
    .then(cheerio.load)
    .then(collectBuildings)
    .then(resolve)
    .catch(reject);
})

const collectDates = ($) => {
  const dates = [];
  $('#dayChanger option').each((i, op) => dates.push($(op).text().trim()));
  return { dates };
}

const collectBuildings = ($) => {
  const buildings = [];
  $('#area option').each((i, op) => buildings.push({
    'label': $(op).text().trim(),
    'value': $(op).attr('value')
  }));
  return { buildings };
};

module.exports = {
  getDatesJson,
  getBuildingJson
}
