import React, { useState, useEffect } from 'react';
import { getIndividualCourseSchedule } from '../../ducks/course';
import CourseDetail from './CourseDetail';

function CourseDisplay(props) {
  const [course, setCourse] = useState(null);
  const { term, subject, catalog_number } = props.match.params;

  const initializeCourseSchedule = () => {
    getIndividualCourseSchedule(term, subject, catalog_number)
      .then(data => setCourse(data[0]))
      .catch(err => console.log(err));
  };

  useEffect(initializeCourseSchedule, []);

  return (
    course && <CourseDetail course={course} open />
  );
}

export default CourseDisplay;
