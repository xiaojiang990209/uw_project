const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const COURSES_URL = require('./urls').COURSES_URL;

const router = express.Router();

// Helper func to help construct form request
getFormBody = (level, session, subject) => {
    return `level=${level}&sess=${session}&subject=${subject.toUpperCase()}`;
}

router.get('/', (req, res) => {
    let level = req.query.level;
    let session = req.query.session;
    let subject = req.query.subject;
    request.post({url: COURSES_URL, body: getFormBody(level, session, subject)}, (err, httpRes, body) => {
        if (!err && httpRes.statusCode === 200) {
            res.status(200).end(body);
        } else {
            res.status(404).end('Error: Cannot access uw_api right now');
        }
    });
});

module.exports = router;