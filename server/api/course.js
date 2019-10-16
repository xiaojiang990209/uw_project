const uwapi = require('uwaterloo-api');
const uwClient = new uwapi({ API_KEY: process.env.UW_API_SECRET });
const { transformScheduleResponse, transformDescriptionResponse, isNullOrEmpty } = require('../utils');

scheduleHandler = (req, res) => {
    const {term, subject} = req.params;
    uwClient.get(`/terms/${term}/${subject}/schedule.json`, (err, resp) => {
        if (!err && resp.meta.status === 200 && !isNullOrEmpty(resp.data)) {
            res.status(200).json(transformScheduleResponse(resp.data));
        } else {
            res.status(404).end(err);
        }
    });
}

descriptionHandler = (req, res) => {
    const {subject, catalog_number} = req.params;
    uwClient.get(`/courses/${subject}/${catalog_number}.json`, (err, resp) => {
        if (!err && resp.meta.status === 200 && !isNullOrEmpty(resp.data)) {
            res.status(200).json(transformDescriptionResponse(resp.data));
        } else {
            res.status(404).end(err);
        }
    });
}

module.exports = {
    scheduleHandler,
    descriptionHandler
}