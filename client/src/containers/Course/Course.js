import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Container, Row, Col, Button } from 'reactstrap';
import CourseDetail from './CourseDetail';
import { courseCodes, semesters } from '../../utils/constants';
import { getCourseSchedule } from '../../ducks/course';
import { Wrapper } from './components';

const subjects = courseCodes.map((x) => ({ value: x, label: x }));
const terms = semesters.map((x) => ({ value: x, label: x }));

const styles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white', margin: '1em auto' }),
};

function Course(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [showCourseComponent, setShowCourseComponent] = useState(false);
  const [courses, setCourses] = useState([]);

  const submitCourse = (e) => {
    e.preventDefault();
    props
      .getCourseSchedule(selectedTerm.value, selectedSubject.value)
      .then((res) => {
        setCourses(res.data);
        setShowCourseComponent(true);
      })
      .catch((err) => console.log(err));
  };

  const generateCourseDetails = (courses) =>
    courses.map((value, index) => <CourseDetail key={index} course={value} />);

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              options={subjects}
              styles={styles}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <Select
              value={selectedTerm}
              onChange={setSelectedTerm}
              options={terms}
              styles={styles}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 4, offset: 5 }}>
            <Button outline color="primary" onClick={submitCourse}>
              Get Courses
            </Button>
          </Col>
        </Row>
      </Container>
      {showCourseComponent && generateCourseDetails(courses)}
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(
  mapStateToProps,
  { getCourseSchedule }
)(Course);
