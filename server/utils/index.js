const { RMP_URL, RMP_PROF_URL, RATING_KEY, ID_KEY, LAST_UPDATED } = require('./constants')

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

transformCourseResponse = data => {
    let courses = []
    let course = {}
    data.data
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

// ------------------------------------------------------------------------------

// Helper function to get the query url for rmp
// Assuming data comes from undergrad calendar website
// Name: Last, First
getQueryUrl = name => {
    const [first, last] = name.split(' ');
    const queryUrl = `${RMP_URL}${first}+${last}`;
    return queryUrl;
}


// Helper function to get the actual url of the rateMyProf page
getProfUrl = id => { return `${RMP_PROF_URL}${id}`; }

// transformResponse: response => { rating: ..., url: ...}
//   Transforms a standard response from rateMyProf to desired format
//   that contains only prof rating and the url that leads to the prof's
//   page in rateMyProf for more info
transformRatingResponse = data => {
    return { score: data[RATING_KEY], url: getProfUrl(data[ID_KEY]) };
}

// --------------------------------------------------------------------------------

module.exports = {
    transformCourseResponse,
    transformRatingResponse
}