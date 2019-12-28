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
    props.getBatchProfRating(newInstructors);
  };

  const renderProfRating = (instructor) => {
    let ratingRow = <td>{instructor}</td>;
    let rating = props.ratingsMap[instructor];
    if (rating && rating.score) {
      ratingRow = (
        <td>
          <a href={rating.url}>
            {instructor} ({rating.score})
          </a>
        </td>
      );
    }
    return ratingRow;
  };

  const renderCourseSections = (course) => {
    const sections = course.sections.map((value, index) => {
      const timeSlot = value.start === null ?
        <td>TBA</td> : <td>{value.start}-{value.end}, {value.days}</td>
      return (
        <tr key={index}>
          <td>{value.section}</td>
          <td>{value.class_number}</td>
          <td>
            {value.total} / {value.capacity}
          </td>
          {timeSlot}
          <td>{value.location}</td>
          {renderProfRating(value.instructor)}
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
