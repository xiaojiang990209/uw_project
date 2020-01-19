import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { getCourseSchedule, getTerms, getSubjects } from '../../ducks/course';
import { MarginWrapper, InfoCard } from './components';
import Search from '../../components/Search';

function Course(props) {
  const [subjects, setSubjects] = useState(null);
  const [filteredSubjects, setFilteredSubjects] = useState(null);

  useEffect(() => { getSubjects().then(setSubjects).catch(console.log) }, []);
  useEffect(() => setFilteredSubjects(subjects), [subjects]);

  const generateSubjects = () => filteredSubjects.map((data, idx) => (
    <MarginWrapper key={idx}>
      <InfoCard title={data.subject} subtitle={data.description} onClick={() => props.history.push(`/course/${data.subject}`)}/>
    </MarginWrapper>
  ));

  const onCourseChanged = (e) => {
    e.preventDefault();
    setFilteredSubjects(subjects.filter(s => s.subject.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <Container>
      <br/>
      <h4>Choose from the following subjects</h4>
      <hr/>
      <Search placeholder="Enter your subject" onChange={onCourseChanged} confirmText="Search" />
      {filteredSubjects && generateSubjects()}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.course.subjects,
  terms: state.course.terms,
  favouriteCourses: state.session.user && state.session.user.favouriteCourses
});

const mapDispatchToProps = ({
  getCourseSchedule,
  getTerms,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);
