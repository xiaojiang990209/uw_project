import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Container, Row, Col, Button } from 'reactstrap';
import CourseDetail from './CourseDetail';
import { courseCodes, semesters } from '../../utils/constants';
import { getCourseSchedule, getTerms } from '../../ducks/course';
import { Wrapper, ButtonWrapper } from './components';

const subjects = courseCodes.map((x) => ({ value: x, label: x }));
const terms = semesters.map((x) => ({ value: x, label: x }));

// TODO: See if we can move this elsewhere
const styles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white', margin: '16px auto' }),
};

function Course(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [showCourseComponent, setShowCourseComponent] = useState(false);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    console.log('here');
    props.getTerms()
      .then((data) => {
        console.log(data);
        setSubjects(data.subjects.map((val) => ({ value: val, label: val })));
        setTerms(data.terms.map((val) => ({ value: val, label: val})));
      })
      .catch((err) => console.log(err));
  }, []);

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
          <Col md={{ size: 4, offset: 1 }}>
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              options={subjects}
              styles={styles}
              placeholder="Subject"
            />
          </Col>
          <Col md={{ size: 4 }}>
            <Select
              value={selectedTerm}
              onChange={setSelectedTerm}
              options={terms}
              styles={styles}
              placeholder="Term"
            />
          </Col>
          <Col md={{ size: 2 }}>
            <ButtonWrapper>
              <Button outline block color="primary" onClick={submitCourse}>
                Get Courses
              </Button>
            </ButtonWrapper>
          </Col>
        </Row>
      </Container>
      {showCourseComponent && generateCourseDetails(courses)}
    </Wrapper>
  );
}

export default connect(
  null,
  { getCourseSchedule, getTerms }
)(Course);
