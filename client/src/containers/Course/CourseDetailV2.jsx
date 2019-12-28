import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { DetailCard, Wrapper } from './components';
import { Subtitle, Content } from '../../components/Card';
import { Button } from '../../components/Button';
import { getTerms, getCourseDescription, getIndividualCourseSchedule } from '../../ducks/course';
import CourseDetail from './CourseDetail';

function CourseDetailV2(props) {
  const { subject, catalog_number } = props.match.params;
  const courseName = `${subject} ${catalog_number}`;
  const [scheduleMap, setScheduleMap] = useState({});
  const [selectedTerm, setSelectedTerm] = useState(null);
  useEffect(() => {
    if (!props.terms) {
      props.getTerms();
    }
    if (!(courseName in props.courseDescriptions)) {
      props.getCourseDescription(courseName);
    }
  }, []);

  const onTermClicked = (term) => {
    if (!(term.key in scheduleMap)) {
      getIndividualCourseSchedule(term.key, subject, catalog_number)
        .then((data) => setScheduleMap({ ...scheduleMap, [term.key]: data[0] }))
        .catch(console.log);
    }
    setSelectedTerm(term);
  }

  const getScheduleTitle = () => `Schedule for ${courseName} in ${selectedTerm.value}`;

  const info = props.courseDescriptions[courseName] || {};

  return (
    <Wrapper>
      <Container>
        <br/><br/>
        <h4>Here's what we found for <strong>{courseName}-{info.title}</strong></h4>
        <hr/>
        <DetailCard title={courseName} subtitle={info.title} content={info.description}>
          <br/>
          <Subtitle>Prerequisites</Subtitle>
          <Content>{info.prerequisites || 'None'}</Content>
          <br/>
          <Subtitle>Antirequisites</Subtitle>
          <Content>{info.antirequisites || 'None'}</Content>
        </DetailCard>
        <hr/>
        <Row>
          {props.terms.map((t, idx) => (
            <Col key={idx}>
              <Button onClick={() => onTermClicked(t)}>{t.value}</Button>
            </Col>
          ))}
        </Row>
        <br/>
        {selectedTerm && selectedTerm.key in scheduleMap && 
          <DetailCard subtitle={getScheduleTitle()}>
            <br/>
            <CourseDetail course={scheduleMap[selectedTerm.key]} />
          </DetailCard>
        }
      </Container>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  terms: state.course.terms,
  ratingsMap: state.course.ratingsMap,
  courseDescriptions: state.course.descriptions,
});

const mapDispatchToProps = ({
  getTerms,
  getCourseDescription
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetailV2);
