const cheerio = require('cheerio');
const RequestFactory = require('../RequestFactory');

const {
  UW_LIB_BOOKING_URL,
  UW_LIB_BOOKING_PREFIX,
  BOOKING_AREA_SELECTOR,
  CELL_SELECTOR,
  IMAGE_SELECTOR,
  DATE_OPTION_SELECTOR,
  BUILDING_OPTION_SELECTOR,
  DEFAULT_ICON_SIZE
} = require('./constants');

class LibraryBookingService {
  _collectDates($) {
    const dates = [];
    $(DATE_OPTION_SELECTOR).each((_, op) => {
      dates.push($(op).text().trim());
    });
    return { dates };
  }

  _collectBuildings($) {
    const buildings = [];
    $(BUILDING_OPTION_SELECTOR).each((_, op) => {
      buildings.push({
        'label': $(op).text().trim(),
        'value': $(op).attr('value')
      });
    });
    return { buildings };
  }

  _collectBookingTable($) {
    $(CELL_SELECTOR).each((_, op) => {
      const oldLink = $(op).attr('href');
      const newLink = `${UW_LIB_BOOKING_PREFIX}/${oldLink}`;
      $(op).attr('href', newLink);
      $(op).attr('target', '_blank');
    });
    $(IMAGE_SELECTOR).each((_, op) => {
      const oldImage = $(op).attr('src');
      const newImage = `/images/${oldImage.substring(oldImage.lastIndexOf('/'))}`;
      $(op).attr('src', newImage);
      $(op).attr('width', DEFAULT_ICON_SIZE);
      $(op).attr('height', DEFAULT_ICON_SIZE);
    });

    return $.html($(BOOKING_AREA_SELECTOR));
  }

  getDates() {
    return new Promise((resolve, reject) => {
      RequestFactory.get(UW_LIB_BOOKING_URL)
        .then(cheerio.load)
        .then(this._collectDates)
        .then(resolve)
        .catch(reject);
    });
  }

  getBuildings() {
    return new Promise((resolve, reject) => {
      RequestFactory.get(UW_LIB_BOOKING_URL)
        .then(cheerio.load)
        .then(this._collectBuildings)
        .then(resolve)
        .catch(reject);
    });
  }

  getRooms(day, area) {
    return new Promise((resolve, reject) => {
      const url = `${UW_LIB_BOOKING_URL}?dayChanger=${day}&area=${area}`;
      RequestFactory.get(url)
        .then(cheerio.load)
        .then(this._collectBookingTable)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = new LibraryBookingService();
