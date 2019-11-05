const { LAST_UPDATED, SEMESTERS } = require('./constants');

// Helper function to transform class info into desired format
// @param: data => individual data object returned from Open Data Api
const getClassInfo = data => {
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

const getClassSectionInfo = data => ({
  class_number: data.class_number,
  section: data.section,
  capacity: data.enrollment_capacity,
  total: data.enrollment_total,
  start: data.start,
  end: data.end,
  days: data.days,
  location: data.location,
  instructor: data.instructor
});

const isUpdatedRecently = data => new Date(data[LAST_UPDATED]).getMonth() == new Date().getMonth();

const transformScheduleResponse = data => {
  let courses = []
  let course = {}
  data.map(getClassInfo)
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

const paramToScheduleURL = (req) => `/terms/${req.params.term}/${req.params.subject}/schedule.json`;

// --------------------------------------------------------------------------

const paramToDescriptionURL = (req) => `/courses/${req.params.subject}/${req.params.catalog_number}.json`;
const transformDescriptionResponse = data => data;

// --------------------------------------------------------------------------

const paramToImportantDatesURL = (req) => {
  const currentTerm = SEMESTERS[SEMESTERS.length - 1];
  return `/terms/${currentTerm}/importantdates.json`;
}
const transformImportantDatesResponse = (data) => {
  return data.map((val) => ({
    title: val.title,
    audience: val.audience,
    start_date: val.start_date,
    end_date: val.end_date,
    link: val.link
  }));
}

// --------------------------------------------------------------------------

const paramToInfoSessionURL = (req) => {
  const currentterm = semesters[semesters.length - 1];
  return `/terms/${currentterm}/infosessions.json`;
}

const transformInfoSessionResponse = (data) => {
  return data.map((val) => ({
    employer: val.employer,
    date: val.date,
    start_time: val.start_time,
    end_time: val.end_time,
    description: val.description,
    website: val.website,
    location: `${val.building.code} ${val.building.room}`,
    link: val.link
  }));
}

module.exports = {
    transformScheduleResponse,
    paramToScheduleURL,
    transformDescriptionResponse,
    paramToDescriptionURL,
    transformImportantDatesResponse,
    paramToImportantDatesURL,
    transformInfoSessionResponse,
    paramToInfoSessionURL
}