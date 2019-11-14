import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Container, Row, Col, Button } from 'reactstrap';
import CourseDetail from './CourseDetail';
import { getCourseSchedule, getTerms } from '../../ducks/course';
import { Wrapper, ButtonWrapper } from './components';

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

  const initializeTerms = () => {
    props.getTerms()
      .then((data) => {
        setSubjects(data.subjects.map((e) => ({ value: e, label: e })));
        setTerms(data.terms.map((e) => ({ value: e.key, label: e.value})));
      })
      .catch((err) => console.log(err));
  }

  const submitCourse = (e) => {
    e.preventDefault();
    if (!selectedTerm || !selectedSubject) return;
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

  useEffect(initializeTerms, [])

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

const mapDispatchToProps = ({
  getCourseSchedule,
  getTerms
})

export default connect(
  null,
  mapDispatchToProps
)(Course);
