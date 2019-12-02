import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Table, Collapse, Card, CardBody, CardText } from 'reactstrap';
import { getBatchProfRating, getCourseDescription } from '../../ducks/course';
import { TextWrapper, BoldTitle, SolidHeart, HollowHeart } from './components';
import Button from '../../components/Button';

function CourseDetail(props) {
  const [showDetail, setShowDetail] = useState(props.open);
  
  useEffect(() => {
    setShowDetail(props.open);
  }, [props.course]);
      
  const fetchCourseDescription = (course) => {
    const distinctInstructors = [
      ...new Set(course.sections.filter((x) => x.instructor).map((x) => x.instructor)),
    ];
    const newInstructors = distinctInstructors
      .filter(instructor => !(instructor in props.ratingsMap));
    props.getBatchProfRating(newInstructors);

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

  const onDetailClicked = (e) => {
    e.preventDefault();
    if (props.open) return;
    if (!showDetail) {
      fetchCourseDescription(props.course);
    }
    setShowDetail(!showDetail);
  };

  const onFavouriteClicked = (e) => {
    e.stopPropagation();
    props.toggle({ name: props.course.name, term: props.course.term, favourite: !props.isFavourite });
  };

  if (props.open) {
    fetchCourseDescription(props.course);
  }

  return (
    <Row style={{ marginTop: '5px' }}>
      <Col md={{ size: 10, offset: 1 }}>
        <Button size="md" onClick={onDetailClicked} block>
          {renderCourseTitle(props.course)}
          {props.isFavourite ? <SolidHeart onClick={onFavouriteClicked} /> : <HollowHeart onClick={onFavouriteClicked} />}
        </Button>
        <Collapse isOpen={showDetail}>
          <Card outline >
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
