const { RMP_URL, RMP_PROF_URL, RATING_KEY, ID_KEY } = require('./constants')
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
transformRatingResponse = data => {
  return { score: data[RATING_KEY], url: getProfUrl(data[ID_KEY]) };
}

getNewNameFromSuggestions = (suggestions) => {
  if (isNullOrEmpty(suggestions)) return null;
  const lastSuggestion = suggestions.pop();
  if (isNullOrEmpty(lastSuggestion.suggestion)) return null;
  return lastSuggestion.suggestion[0];
}

fetchProfInfo = (name) => {
  let RETRY_COUNT = 2;
  const defaultError = {
    message: `Could not fetch professor ${name}`
  };
  return new Promise(async (resolve, reject) => {
    while (RETRY_COUNT != 0) {
      try {
        const body = JSON.parse(await requestWrapper('GET', getQueryUrl(name)));
        if (!isNullOrEmpty(body.response.docs)) {
          resolve(transformRatingResponse(body.response.docs[0]));
        }
        name = getNewNameFromSuggestions(body.spellcheck.suggestions);
        if (!name) reject(defaultError);
      } catch (err) {
        reject(defaultError);
      }
      --RETRY_COUNT;
    }
  });
}

module.exports = {
  fetchProfInfo
}