const request = require('request');
const { transformRatingResponse } = require('../utils');

profInfoHandler = (req, res) => {
    let name = req.params.name
    request.get(getQueryUrl(name), (err, _, body) => {
        if (!err) {
            body = JSON.parse(body);
            if (body.response.numFound > 0) {
                // Return prof rating and a url that leads to the page of the prof
                res.json(transformRatingResponse(body.response.docs[0]));
            } else {
                res.status(404).end(`Error: could not find professor ${name}`)
            }
        } else {
            res.status(404).end("Error: could not retrieve information");
        }
    });
}

module.exports = {
    profInfoHandler
}