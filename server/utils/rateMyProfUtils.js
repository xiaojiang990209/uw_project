const { RMP_URL, RMP_PROF_URL, RATING_KEY, ID_KEY, CITY_STATE_KEY } = require('./constants')
const { isNullOrEmpty, requestWrapper } = require('./globalUtils');

// Helper function to get the query url for rmp
// Assuming data comes from undergrad calendar website
// Name: Last, First
getQueryUrl = name => {
  const [first, last] = name.split(' ');
  const queryUrl = `${RMP_URL}${first}+${last}`;
  return queryUrl;
}

// Helper function to get the actual url of the rateMyProf page
getProfUrl = id => { return `${RMP_PROF_URL}${id}`; }

// transformResponse: response => { rating: ..., url: ...}
//   Transforms a standard response from rateMyProf to desired format
//   that contains only prof rating and the url that leads to the prof's
//   page in rateMyProf for more info
transformRatingResponse = (name, data) => {
  return { name, score: data[RATING_KEY], url: getProfUrl(data[ID_KEY]) };
};

isValidProf = (data) => data[CITY_STATE_KEY] === 'Waterloo_ON';

getNewNameFromSuggestions = (suggestions) => {
  if (isNullOrEmpty(suggestions)) return null;
  const lastSuggestion = suggestions.pop();
  if (isNullOrEmpty(lastSuggestion.suggestion)) return null;
  return lastSuggestion.suggestion[0];
};

tryFetchProfessor = (resolve, reject, error, name, url, limit) => {
  if (limit <= 0) return reject(error);
  requestWrapper('GET', url)
    .then(body => JSON.parse(body))
    .then(body => {
      if (!isNullOrEmpty(body.response.docs)) {
        const validProf = body.response.docs.find(isValidProf);
        if (isValidProf) {
          return resolve(transformRatingResponse(name, validProf));
        }
      }
      const newName = getNewNameFromSuggestions(body.spellcheck.suggestions);
      if (!newName) return reject(error);
      tryFetchProfessor(resolve, reject, error, name, getQueryUrl(newName), limit - 1);
    })
    .catch(err => { return reject(error); });
};

fetchProfInfo = (name) => {
  const RETRY_COUNT = 2;
  const defaultError = {
    message: `Could not fetch professor ${name}`
  };
  return new Promise((resolve, reject) => {
    tryFetchProfessor(resolve, reject, defaultError, name, getQueryUrl(name), RETRY_COUNT);
  });
}

module.exports = {
  fetchProfInfo
}
