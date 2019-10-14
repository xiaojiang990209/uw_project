const uwapi = require('uwaterloo-api');
const uwClient = new uwapi({ API_KEY: process.env.UW_API_SECRET });
const { transformCourseResponse } = require('../utils');

scheduleHandler = (req, res) => {
    let {term, subject} = req.params;
    uwClient.get(`/terms/${term}/${subject}/schedule.json`, (err, data) => {
        if (!err) {
            res.status(200).json(transformCourseResponse(data));
        } else {
            res.status(404).end("");
        }
    });
}

descriptionHandler = (req, res) => {
    let [ subject, catalog_number ] = req.params.name.split(" ");
    uwClient.get(`/courses/${subject}/${catalog_number}.json`, (err, data) => {
        if (!err) {
            res.status(200).json(data.data);
        } else {
            res.status(404).end("");
        }
    });
}

module.exports = {
    scheduleHandler,
    descriptionHandler
}