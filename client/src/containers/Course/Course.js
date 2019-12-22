import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import CourseDetail from './CourseDetail';
import { getCourseSchedule, getTerms } from '../../ducks/course';
import { updateFavouriteCourses } from '../../ducks/session';
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
  const terms = (props.terms || []).map((e => ({ value: e.key, label: e.value })));

  const submitCourse = (e) => {
    e.preventDefault();
    if (!selectedTerm || !selectedSubject) return;
    props
      .getCourseSchedule(selectedTerm.value, selectedSubject.value)
      .then((res) => {
        setCourses(res.data);
        setShowCourseComponent(true);
      });
  };

  const generateCourseDetails = (courses) => courses.map((course, index) => {
    const isFavourite = (props.favouriteCourses[course.name] || []).map(v => v.value).includes(course.term.value.toString());
    return (<CourseDetail key={index} course={course} isFavourite={isFavourite} toggle={toggleFavourite}/>);
  });

  const toggleFavourite = ({name, term, favourite}) => {
    let updatedFavouriteCourses = {};
    if (favourite) {
      updatedFavouriteCourses = {
        ...props.favouriteCourses,
        [name]: [ ...(props.favouriteCourses[name] || []), { ...term } ]
      };
    } else {
      updatedFavouriteCourses = {
        ...props.favouriteCourses,
        [name]: props.favouriteCourses[name].filter(v => v.value !== term.value.toString())
      };
      if (!updatedFavouriteCourses[name].length) {
        delete updatedFavouriteCourses[name];
      }
    }
    props.updateFavouriteCourses(updatedFavouriteCourses);
  }

  const onCourseCodeChanged = (e) => {
    e.preventDefault();
    const code = e.target.value;
    const filtered = courses.filter((course) => course.name.includes(code));
    setFilteredCourses(filtered);
  }

  useEffect(() => {
    if (!props.subjects.length || !props.terms.length) {
      props.getTerms();
    }
    return () => {
      props.updateFavouriteCourses(null);
    };
  }, []);
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
  terms: state.course.terms,
  favouriteCourses: state.session.user.favouriteCourses
});

const mapDispatchToProps = ({
  getCourseSchedule,
  getTerms,
  updateFavouriteCourses
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);
