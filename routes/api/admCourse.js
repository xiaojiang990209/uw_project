const express = require('express');
const uwapi = require('uwaterloo-api')
const router = express.Router();

const uwClient = new uwapi({
    API_KEY: process.env.API_KEY
});

router.get('/', (req, res) => {
    let term = req.query.term;
    let subject = req.query.subject;
    uwClient.get(`/terms/${term}/${subject}/schedule.json`, (err, data) => {
        if (err) {
            res.status(404).end(err);
        } else {
            res.status(200).json(data);
        }
    });
});

module.exports = router;