import React, { useState, useEffect } from 'react';
import { getCourses } from '../../ducks/course';
import { InfoCard, MarginWrapper, Wrapper } from './components';
import { Container } from 'reactstrap';
import Search from '../../components/Search';

function CourseSubject(props) {
  const { subject } = props.match.params;
  const [courses, setCourses] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(null);
  useEffect(() => { 
    getCourses(subject)
      .then(courses => {
        setCourses(courses.map(c => ({ ...c, name: `${c.subject} ${c.catalog_number}`})))
      })
      .catch(console.log) }, []);
  useEffect(() => setFilteredCourses(courses), [courses]);

  const generateCourses = () => filteredCourses.map((course, idx) => (
    <MarginWrapper key={idx}>
      <InfoCard title={course.name} subtitle={course.title} content={course.description}
        onClick={() => props.history.push(`/course/${subject}/${course.catalog_number}`)}/>
    </MarginWrapper>
  ));

  const onCourseChanged = (e) => {
    e.preventDefault();
    setFilteredCourses(courses.filter(c => c.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <Wrapper>
      <Container>
        <br/><br/>
        <h4>Choose from the following <strong>{subject.toUpperCase()}</strong> courses</h4>
        <hr/>
        <Search placeholder="Enter your course" onChange={onCourseChanged} confirmText="Search" />
        {filteredCourses && generateCourses()}
      </Container>
    </Wrapper>
  );
}

export default CourseSubject;
