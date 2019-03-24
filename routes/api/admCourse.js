const express = require('express');
const uwapi = require('uwaterloo-api');
const router = express.Router();

const uwClient = new uwapi({
    API_KEY: process.env.API_KEY
});

// Helper function to transform class info into desired format
// @param: x => individual data object returned from Open Data Api
getClassInfo = x => {
    const { date, location, instructors } = x.classes[0];
    const instructor = instructors[0];
    return {
        name: `${x.subject} ${x.catalog_number}`,
        title: x.title,
        class_number: x.class_number,
        section: x.section,
        capacity: x.enrollment_capacity,
        total: x.enrollment_total,
        start: date.start_time,
        end: date.end_time,
        days: date.weekdays,
        location: `${location.building} ${location.room}`,
        instructor
    };
}


getCourses = data => {
    return data.data
        .filter(x => new Date(x['last_updated']).getMonth() == new Date().getMonth())
        .map(x => getClassInfo(x))
}

router.get('/', (req, res) => {
    let term = req.query.term;
    let subject = req.query.subject;
    uwClient.get(`/terms/${term}/${subject}/schedule.json`, (err, data) => {
        if (!err) {
            res.status(200).json(getCourses(data));
        } else {
            res.status(404).end(err);
        }
    });
});

module.exports = router;