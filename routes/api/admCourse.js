const express = require('express');
const uwapi = require('uwaterloo-api');
const router = express.Router();

const uwClient = new uwapi({
    API_KEY: ''
});

// Helper function to transform class info into desired format
// @param: x => individual data object returned from Open Data Api
getClassInfo = x => {
    const { date, location, instructors } = x.classes[0];
    let [last, first] = ['', '']
    if (instructors[0] !== undefined) {
        [last, first] = instructors[0].split(",");
        first = first.split(" ")[0];
    }
    const formattedLocation = location.building === null ? '' : `${location.building} ${location.room}`;
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
        location: formattedLocation,
        instructor: `${first} ${last}`
    };
}

getClassSectionInfo = val => {
    return {
        class_number: val.class_number,
        section: val.section,
        capacity: val.capacity,
        total: val.total,
        start: val.start,
        end: val.end,
        days: val.days,
        location: val.location,
        instructor: val.instructor
    };
}


getCourses = data => {
    data = data.data
        .filter(x => new Date(x['last_updated']).getMonth() == new Date().getMonth())
        .map(x => getClassInfo(x));
    let courses = []
    let course = {}
    data.forEach(val => {
        if (val.name === course.name) {
            course.sections.push(getClassSectionInfo(val));
        } else {
            courses.push(course);
            course = {
                name: val.name,
                title: val.title,
                sections: [getClassSectionInfo(val)]
            };
        }
    });
    return courses.filter(x => x.sections)
}

router.get('/schedule/:term/:subject', (req, res) => {
    let term = req.params.term;
    let subject = req.params.subject;
    uwClient.get(`/terms/${term}/${subject}/schedule.json`, (err, data) => {
        if (!err) {
            res.status(200).json(getCourses(data));
        } else {
            res.status(404).end("");
        }
    });
});

router.get('/description/:name', (req, res) => {
    let [ subject, catalog_number ] = req.params.name.split(" ");
    uwClient.get(`/courses/${subject}/${catalog_number}.json`, (err, data) => {
        console.log(data);
        if (!err) {
            res.status(200).json(data.data);
        } else {
            res.status(404).end("");
        }
    });
});

module.exports = router;