import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getIndividualCourseSchedule } from '../../ducks/course';
import { updateFavouriteCourses } from '../../ducks/session';
import CourseDetail from './CourseDetail';

function CourseDisplay(props) {
  const [course, setCourse] = useState(null);
  const { term, subject, catalog_number } = props.match.params;
  const isFavourite = course && (props.favouriteCourses[course.name] || []).map(v => v.value).includes(course.term.toString());

  useEffect(() => {
    getIndividualCourseSchedule(term, subject, catalog_number)
      .then(data => setCourse(data[0]))
      .catch(err => console.log(err));
    return () => {
      props.updateFavouriteCourses(null);
    };
  }, []);

  const toggleFavourite = ({name, term, favourite}) => {
    let updatedFavouriteCourses = {};
    if (favourite) {
      const label = props.terms.filter(v => v.key === term)[0].value;
      updatedFavouriteCourses = {
        ...props.favouriteCourses,
        [name]: [ ...(props.favouriteCourses[name] || []), { value: term, label } ]
      };
    } else {
      updatedFavouriteCourses = {
        ...props.favouriteCourses,
        [name]: props.favouriteCourses[name].filter(v => v.value !== term.toString())
      };
      if (!updatedFavouriteCourses[name].length) {
        delete updatedFavouriteCourses[name];
      }
    }
    props.updateFavouriteCourses(updatedFavouriteCourses);
  }

  return (
    course && <CourseDetail course={course} open isFavourite={isFavourite} toggle={toggleFavourite} />
  );
}

const mapStateToProps = (state) => ({
  favouriteCourses: state.session.user.favouriteCourses,
  terms: state.course.terms
});

const mapDispatchToProps = ({
  updateFavouriteCourses
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDisplay);
