const { LAST_UPDATED } = require('./constants');

// Helper function to transform class info into desired format
// @param: data => individual data object returned from Open Data Api
getClassInfo = data => {
    const { date, location, instructors } = data.classes[0];

    let instructor;
    if (instructors && instructors[0]) {
        let [last, first] = instructors[0].split(",");
        first = first.split(" ")[0];
        instructor = `${first} ${last}`;
    }

    const formattedLocation = location.building ? `${location.building} ${location.room}` : null;
    const name = `${data.subject} ${data.catalog_number}`;

    return {
        name,
        instructor,
        start: date.start_time,
        end: date.end_time,
        days: date.weekdays,
        location: formattedLocation,
        ...data
    };
}

getClassSectionInfo = data => {
    return {
        class_number: data.class_number,
        section: data.section,
        capacity: data.capacity,
        total: data.total,
        start: data.start,
        end: data.end,
        days: data.days,
        location: data.location,
        instructor: data.instructor
    };
}

isUpdatedRecently = data => new Date(data[LAST_UPDATED]).getMonth() == new Date().getMonth();

transformScheduleResponse = data => {
    let courses = []
    let course = {}
    data
        .filter(isUpdatedRecently)
        .map(getClassInfo)
        .forEach(val => {
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
        })
    return courses.filter(x => x.sections)
}

// --------------------------------------------------------------------------

transformDescriptionResponse = data => data;

// --------------------------------------------------------------------------

module.exports = {
    transformScheduleResponse,
    transformDescriptionResponse
}