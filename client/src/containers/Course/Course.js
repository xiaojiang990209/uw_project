import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import CourseDetail from './CourseDetail';
import { getCourseSchedule, getTerms } from '../../ducks/course';
import { Wrapper, MarginWrapper } from './components';

const styles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white', margin: '16px auto' }),
};

function Course(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [showCourseComponent, setShowCourseComponent] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const subjects = (props.subjects || []).map((e) => ({ value: e, label: e }));
  const terms = (props.terms || []).map((e => ({ value: e.key, label: e.value})));

  const initializeTerms = () => {
    if (!props.subjects || !props.terms) {
      props.getTerms();
    }
  };

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

  const onCourseCodeChanged = (e) => {
    e.preventDefault();
    const code = e.target.value;
    const filtered = courses.filter((course) => course.name.includes(code));
    setFilteredCourses(filtered);
  }

  useEffect(initializeTerms, []);
  useEffect(() => setFilteredCourses(courses), [courses]);

  return (
    <Wrapper>
      <Container>
        <br/><br/>
        <h4>Looking for course information ?</h4>
        <hr/>
        <Row>
          <Col md={{ size: 4 }}>
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
            <MarginWrapper>
              <Input placeholder="Filter (e.g. 111)" onChange={onCourseCodeChanged}/>
            </MarginWrapper>
          </Col>
          <Col md={{ size: 2 }}>
            <MarginWrapper>
              <Button outline block onClick={submitCourse}>
                Get Courses
              </Button>
            </MarginWrapper>
          </Col>
        </Row>
      </Container>
      {showCourseComponent && generateCourseDetails(filteredCourses)}
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.course.subjects,
  terms: state.course.terms
});

const mapDispatchToProps = ({
  getCourseSchedule,
  getTerms
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);
