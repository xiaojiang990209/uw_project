import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { getBatchProfRating, getCourseDescription } from '../../ducks/course';
import { TextWrapper } from './components';

function CourseDetail(props) {
  const fetchCourseDescription = (course) => {
    const distinctInstructors = [
      ...new Set(course.sections.filter((x) => x.instructor).map((x) => x.instructor)),
    ];
    const newInstructors = distinctInstructors
      .filter(instructor => !(instructor in props.ratingsMap));
    newInstructors && props.getBatchProfRating(newInstructors);
  };

  const renderCourseSections = (course) => {
    const sections = course.sections.map((value, index) => {
      const instructor = value.instructor || '';
      const rating = props.ratingsMap[instructor];
      const ratingInfo = (rating && rating.score) ?
        <a href={rating.url} target='__blank'>{instructor} ({rating.score})</a> :
        instructor.toString();

      const timeSlot = value.start ?
        `${value.start}-${value.end}, ${value.days}` :
        'TBA';

      return (
        <tr key={index}>
          <td>{value.section}</td>
          <td>{value.class_number}</td>
          <td>{value.total} / {value.capacity}</td>
          <td>{timeSlot}</td>
          <td>{value.location}</td>
          <td>{ratingInfo}</td>
        </tr>
      );
  });
  return (
    <TextWrapper>
      <Table size="sm" responsive>
        <thead>
          <tr>
            <th>Section</th>
            <th>Class</th>
            <th>Enrolled</th>
            <th>Time</th>
            <th>Location</th>
            <th>Instructor</th>
          </tr>
        </thead>
        <tbody>{sections}</tbody>
      </Table>
    </TextWrapper>
  );
  };

  useEffect(() => fetchCourseDescription(props.course), []);

  return renderCourseSections(props.course);
}

CourseDetail.propTypes = {
  ratingsMap: PropTypes.object.isRequired,
  courseDescriptions: PropTypes.object.isRequired,
  getBatchProfRating: PropTypes.func,
  getCourseDescription: PropTypes.func,
};

const mapStateToProps = (state) => ({
  ratingsMap: state.course.ratingsMap,
  courseDescriptions: state.course.descriptions,
});

const mapDispatchToProps = ({
  getBatchProfRating,
  getCourseDescription,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetail);
