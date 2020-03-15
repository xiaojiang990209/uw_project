const {
  RMP_URL,
  RMP_PROF_URL,
  RATING_KEY,
  ID_KEY,
  CITY_STATE_KEY
} = require('./constants');

const RequestFactory = require('../RequestFactory');
const _ = require('lodash');

class RateMyProfService {
  _getQueryUrl(name) {
    const [firstName, lastName] = name.split(' ');
    return `${RMP_URL}${firstName}+${lastName}`;
  }

  _isValidProf(data) {
    return data[CITY_STATE_KEY] === 'Waterloo_ON';
  }

  _getProfUrl(data) {
    return `${RMP_PROF_URL}${data[ID_KEY]}`;
  }

  _transformRatingResponse(name, data) {
    return ({
      name,
      score: data[RATING_KEY],
      url: this._getProfUrl(data)
    });
  }

  _getNextSuggestion(suggestions) {
    if (_.isEmpty(suggestions)) {
      return null;
    }
    const lastSuggestion = suggestions.pop();
    if (_.isEmpty(lastSuggestion.suggestion)) {
      return null;
    }
    return lastSuggestion.suggestion[0];
  }

 fetchProfInfo(name) {
    let RETRY_COUNT = 2;
    const defaultError = ({
        message: `Could not fetch professor ${name}`
    });
    return new Promise(async (resolve, reject) => {
      try {
        while (RETRY_COUNT--) {
          const url = this._getQueryUrl(name);
          const resp = await RequestFactory.get(url);
          const data = JSON.parse(resp);
          const infoList = data.response.docs;
          const suggestions = data.spellcheck.suggestions;
          if (!_.isEmpty(infoList)) {
            const validProf = infoList.find(this._isValidProf);
            if (validProf) {
              return resolve(this._transformRatingResponse(name, validProf));
            }
          }
          const newProfName = this._getNextSuggestion(suggestions);
          if (!newProfName) {
            return reject(defaultError);
          }
          name = newProfName;
        }
        return reject(defaultError);
      } catch (err) {
        console.err(err);
        reject(defaultError);
      }
    });
  }

  fetchProfInfoList(names) {
    const swallowError = (err) => {};
    const filterValidResponse = (values) => {
      return values.filter(val => !_.isEmpty(val));
    }
    const unfulfilledPromises = names.map(name => 
      this.fetchProfInfo(name).catch(swallowError));
    return Promise.all(unfulfilledPromises)
      .then(values => filterValidResponse(values));
  }
}

module.exports = new RateMyProfService();