const request = require('request');
const {
    getQueryUrl,
    transformRatingResponse,
    isNullOrEmpty
} = require('../utils');
const HTTP_STATUS = require('../utils/statusCodes');

profInfoHandler = (req, res) => {
    const name = req.params.name
    request.get(getQueryUrl(name), (err, _, body) => {
        if (!err) {
            body = JSON.parse(body);
            if (!isNullOrEmpty(body.response.docs)) {
                // Return prof rating and a url that leads to the page of the prof
                res.json(transformRatingResponse(body.response.docs[0]));
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).end(`Error: could not find professor ${name}`)
            }
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).end("Error: could not retrieve information");
        }
    });
}

module.exports = {
    profInfoHandler
}