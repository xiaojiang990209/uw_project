const AbstractUWApiService = require('./AbstractUWApiService');
const Entities = require('html-entities').AllHtmlEntities;

class UWApiNewsService extends AbstractUWApiService {

  static DEFAULT_LOCALE = 'en-CA';

  constructor(uwClient) {
    super(uwClient);
    this.entities = new Entities();
  }

  getUrlFromRequest(req) {
    return 'news.json';
  }

  getResponseBodyFromData(data) {
    return data.map((val) => ({
      title: this._getDecodedTitle(val),
      date: this._getDate(val),
      link: val.link,
    }), this);
  }

  _getDecodedTitle(data) {
    return this.entities.decode(data.title);
  }

  _getDate(data) {
    return new Date(data.updated).toLocaleString(this.DEFAULT_LOCALE);
  }
}

module.exports = UWApiNewsService;

