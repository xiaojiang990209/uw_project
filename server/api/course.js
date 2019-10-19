const uwapi = require('uwaterloo-api');
const uwClient = new uwapi({ API_KEY: process.env.UW_API_SECRET });
const {
    transformScheduleResponse,
    transformDescriptionResponse,
    isNullOrEmpty
} = require('../utils');
const HTTP_STATUS = require('../utils/statusCodes');

scheduleHandler = (req, res) => {
    const {term, subject} = req.params;
    uwClient.get(`/terms/${term}/${subject}/schedule.json`, (err, resp) => {
        if (!err && resp.meta.status === HTTP_STATUS.OK && !isNullOrEmpty(resp.data)) {
            res.json(transformScheduleResponse(resp.data));
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json(err);
        }
    });
}

descriptionHandler = (req, res) => {
    const {subject, catalog_number} = req.params;
    uwClient.get(`/courses/${subject}/${catalog_number}.json`, (err, resp) => {
        if (!err && resp.meta.status === HTTP_STATUS.OK && !isNullOrEmpty(resp.data)) {
            res.json(transformDescriptionResponse(resp.data));
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json(err);
        }
    });
}

module.exports = {
    scheduleHandler,
    descriptionHandler
}