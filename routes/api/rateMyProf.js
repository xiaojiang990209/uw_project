const express = require('express');
const request = require('request');
const { RMP_URL, RMP_PROF_URL } = require('./urls');

const router = express.Router();
const RATING_KEY = 'averageratingscore_rf';
const ID_KEY = 'pk_id';

// Helper function to get the query url for rmp
// Assuming data comes from undergrad calendar website
// Name: Last, First
getQueryUrl = (name) => {
    const [last, first] = name.split(',');
    const queryUrl = `${RMP_URL}${first.split(' ')[0]}+${last}`;
    return queryUrl;
}

getProfUrl = (id) => { return `${RMP_PROF_URL}${id}`; }

getResponse = (response) => {
    return { rating: response[RATING_KEY], url: `${getProfUrl(response[ID_KEY])}`};
}

// @route  GET  /api/rmp/:name
// @desc   Get info related to prof :name from University of Waterloo
// @access Public
router.get('/:name', (req, res) => {
    name = req.params.name
    request.get(getQueryUrl(name), (err, _, body) => {
        if (!err && res.statusCode === 200) {
            body = JSON.parse(body);
            if (body.response.numFound > 0) {
                // Return prof rating and a url that leads to the page of the prof
                res.json(getResponse(body.response.docs[0]));
            } else {
                res.status(404).end(`Error: could not find professor ${name}`)
            }
        } else {
            res.status(404).end("Error: could not retrieve information");
        }
    });
})

/**
 * Later, we could extend the above api to profs from different universities
 */

module.exports = router;