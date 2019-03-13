const express = require('express');
const request = require('request');
const RMP_URL = require('./urls').RMP_URL;

const router = express.Router();

// Helper function to get the query url for rmp
// Assuming data comes from undergrad calendar website
// Name: Last, First
getQueryUrl = (name) => {
    const [last, first] = name.split(',');
    const queryUrl = `${RMP_URL}${first}+${last}`;
    return queryUrl;
}

// @route  GET  /api/rmp/:name
// @desc   Get info related to prof :name from University of Waterloo
// @access Public
router.get('/:name', (req, res) => {
    request.get(getQueryUrl(req.params.name), (err, _, body) => {
        if (!err && res.statusCode === 200) {
            body = JSON.parse(body);
            if (body.response.numFound > 0) {
                res.json(body.response.docs[0]);
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