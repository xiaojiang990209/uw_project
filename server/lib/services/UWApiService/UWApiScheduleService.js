const AbstractUWApiService = require('./AbstractUWApiService');
const { TERMS } = require('../../../data/terms.json');

class UWApiScheduleService extends AbstractUWApiService {
  constructor(uwClient) {
    super(uwClient);
  }

  getUrlFromRequest(req) {
    const { term, subject, catalog_number } = req.params;
    if (catalog_number) {
      return `/terms/${term}/${subject}/${catalog_number}/schedule.json`;
    }
    return `/terms/${term}/${subject}/schedule.json`;
  }

  getResponseBodyFromData(data) {
    let courses = []
    let course = {}
    data.map(this._toClassInfo, this).forEach(val => {
      if (val.name === course.name) {
        course.sections.push(this._toClassSectionInfo(val));
      } else {
        courses.push(course);
        course = {
          name: val.name,
          title: val.title,
          term: val.term,
          sections: [this._toClassSectionInfo(val)]
        };
      }
    })
    courses.push(course);
    return courses.filter(x => x.sections)
  }

  _getInstructorName(instructors) {
    if (!instructors || !instructors[0]) return "";
    const [lastName, firstName] = instructors[0].split(",");
    const firstNameToken = firstName.split(" ")[0];
    return `${firstNameToken} ${lastName}`;
  }

  _getLocation(location) {
    return location.building ? `${location.building} ${location.room}` : '';
  }

  _getCourseName(data) {
    return `${data.subject} ${data.catalog_number}`;
  }

  _getTerm(data) {
    const { key: value, value: label } = TERMS.filter(e => e['key'] === data.term.toString())[0];
    return { value, label };
  }

  _getDates(date) {
    return ({
      start: date.start_time,
      end: date.end_time,
      days: date.weekdays
    });
  }

  _toClassInfo(data) {
    const { date, location, instructors } = data.classes[0];

    const instructor = this._getInstructorName(instructors);
    const cleanLocation = this._getLocation(location);
    const courseName = this._getCourseName(data);
    const term = this._getTerm(data);
    const dates = this._getDates(date);

    return ({
      ...data,
      ...dates,
      name: courseName,
      term,
      location: cleanLocation
    });
  }

  _toClassSectionInfo(data) {
    return ({
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
  };
}

module.exports = UWApiScheduleService;

