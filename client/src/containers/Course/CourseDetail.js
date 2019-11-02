import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Collapse, Card, CardBody, CardText } from 'reactstrap';
import { getBatchProfRating, getCourseDescription } from '../../ducks/course';
import { TextWrapper, BoldTitle } from './components';

function CourseDetail(props) {
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => setShowDetail(false), [props.course]);

  const fetchCourseDescription = (course) => {
    let distinctInstructors = [
      ...new Set(course.sections.filter((x) => x.instructor).map((x) => x.instructor)),
    ];
    props.getBatchProfRating(distinctInstructors
      .filter(instructor => !(instructor in props.ratingsMap)));
    if (!(course.name in props.courseDescriptions)) {
      props.getCourseDescription(course.name);
    }
  };

  const renderCourseTitle = (course) => (
    <span>
      {course.name}: {course.title}
    </span>
  );

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

  const renderCourseInfo = (course) => {
    let infoSection;
    let info = props.courseDescriptions[course.name];
    if (info !== undefined && info !== null) {
      infoSection = (
        <TextWrapper>
          <BoldTitle>Description</BoldTitle>
          <CardText>{info.description}</CardText>
          <BoldTitle>Prerequisites</BoldTitle>
          <CardText>{info.prerequisites || 'None'}</CardText>
          <BoldTitle>Antirequisites</BoldTitle>
          <CardText>{info.antirequisites || 'None'}</CardText>
        </TextWrapper>
      );
    }
    return infoSection;
  };

  const renderCourseSections = (course) => {
    const sections = course.sections.map((value, index) => {
      const timeSlot =
        value.start === null ? (
          <td>TBA</td>
        ) : (
          <td>
            {value.start}-{value.end}, {value.days}
          </td>
        );
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
        <Table size="sm">
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

  const onDetailClicked = (e) => {
    e.preventDefault();
    if (!showDetail) {
      fetchCourseDescription(props.course);
    }
    setShowDetail(!showDetail);
  };

  return (
    <Row style={{ marginTop: '5px' }}>
      <Col md={{ size: 8, offset: 2 }}>
        <Button color="primary" size="md" onClick={onDetailClicked} block>
          {renderCourseTitle(props.course)}
        </Button>
        <Collapse isOpen={showDetail}>
          <Card outline color="primary">
            <CardBody>
              {renderCourseInfo(props.course)}
              <br />
              {renderCourseSections(props.course)}
            </CardBody>
          </Card>
        </Collapse>
      </Col>
    </Row>
  );
}

CourseDetail.propTypes = {
  getBatchProfRating: PropTypes.func.isRequired,
  getCourseDescription: PropTypes.func.isRequired,
  ratingsMap: PropTypes.object.isRequired,
  courseDescriptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ratingsMap: state.course.ratingsMap,
  courseDescriptions: state.course.descriptions,
});

export default connect(
  mapStateToProps,
  { getBatchProfRating, getCourseDescription }
)(CourseDetail);
