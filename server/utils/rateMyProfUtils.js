const { RMP_URL, RMP_PROF_URL, RATING_KEY, ID_KEY } = require('./constants')

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

module.exports = {
    getQueryUrl,
    transformRatingResponse
}