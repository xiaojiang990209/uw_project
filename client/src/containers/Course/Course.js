import React, { useState } from 'react';
import { getCourseSchedule } from '../../actions/courseActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Container, Row, Col, Button } from 'reactstrap';
import { courseCodes, semesters } from '../../utils/courseCodes';
import styled from 'styled-components';
import CourseDetail from './CourseDetail';

const subjects = courseCodes.map(x => ({value: x, label: x}));
const terms = semesters.map(x => ({value: x, label: x}));

const styles = {
  control: styles => ({ ...styles, backgroundColor: 'white', margin: '1em auto' }),
}

const Wrapper = styled.div`
  min-height: 100%;
  margin-top: 48px;
`;

function Course(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [showCourseComponent, setShowCourseComponent] = useState(false);
  const [courses, setCourses] = useState([]);

  const submitCourse = e => {
      e.preventDefault();
      props.getCourseSchedule(selectedTerm.value, selectedSubject.value)
          .then(res => { setCourses(res.data); setShowCourseComponent(true); })
          .catch(err => console.log(err));
  }

  const generateCourseDetails = courses => courses.map((value, index) => (
    <CourseDetail key={index} course={value} />
  ));

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col md={{ size: 4, offset: 4}}>
            <Select
              value={selectedSubject}
                onChange={setSelectedSubject}
                options={subjects}
                styles={styles}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 4, offset: 4}}>
            <Select
              value={selectedTerm}
              onChange={setSelectedTerm}
              options={terms}
              styles={styles}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 4, offset: 5}}>
            <Button outline color='primary' style={{borderRadius: '20px'}} onClick={submitCourse}>Get Courses</Button>
          </Col>
        </Row>
      </Container>
      {showCourseComponent && generateCourseDetails(courses)}
    </Wrapper>
  );
}

Course.propTypes = {
  getCourseSchedule: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(
  mapStateToProps,
  { getCourseSchedule }
)(Course);
