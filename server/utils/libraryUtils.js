const cheerio = require('cheerio');
const { requestWrapper } = require('./globalUtils');
const { UW_LIB_BOOKING_URL, UW_LIB_BOOKING_PREFIX } = require('./constants');

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

const getBookingTableHtml = () => new Promise((resolve, reject) => {
  requestWrapper('GET', UW_LIB_BOOKING_URL)
    .then(cheerio.load)
    .then(collectBookingTable)
    .then(resolve)
    .then(reject);
})

const collectBookingTable = ($) => {
  $('#day_main > tbody > tr > td > div > a').each((i, op) => {
    const oldHref = $(op).attr('href');
    const newHref = `${UW_LIB_BOOKING_PREFIX}/${oldHref}`;
    $(op).attr('href', newHref);
    // Make links open in a new tab
    $(op).attr('target', '_blank');
  });
  $('#day_main > tbody > tr > td > div > a > img').each((i, op) => {
    const oldSrc = $(op).attr('src');
    const newSrc = `/images/${oldSrc}`;
    $(op).attr('src', newSrc);
  });

  return $.html($('#day_main'));
}

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
  getBuildingJson,
  getBookingTableHtml
}
