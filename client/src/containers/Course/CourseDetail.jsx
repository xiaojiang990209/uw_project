import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { DetailCard } from './components';
import { Card, Subtitle } from '../../components/Card';
import Button from '../../components/Button';
import { getTerms, getCourseDescription, getIndividualCourseSchedule } from '../../ducks/course';
import { updateFavouriteCourses } from '../../ducks/session';
import { showSuccessNotif } from '../../utils/sendNotification';
import CourseSchedule from './CourseSchedule';

function CourseDetail(props) {
  const { subject, catalog_number } = props.match.params;
  const courseName = `${subject} ${catalog_number}`;
  const [scheduleMap, setScheduleMap] = useState({});
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [favourite, setFavourite] = useState(props.favouriteCourses && props.favouriteCourses.includes(courseName));
  const favouriteRef = useRef(favourite);

  // Listen for route changes
  props.history.listen((loc, act) => {
    console.log('changed');
  });

  useEffect(() => {
    if (!(props.terms || []).length) {
      props.getTerms();
    }
    if (!(courseName in props.courseDescriptions)) {
      props.getCourseDescription(courseName);
    }
    return saveFavouriteCourses;
  }, []);
  useEffect(() => { favouriteRef.current = favourite; }, [favourite]);

  const saveFavouriteCourses = () => {
    const isFavourite = favouriteRef.current;
    if (favourite !== isFavourite) {
      const updatedFavouriteCourses = isFavourite ?
        [ ...props.favouriteCourses, courseName ] :
        props.favouriteCourses.filter(c => c !== courseName);
      props.updateFavouriteCourses(updatedFavouriteCourses);
    }
  }

  const onTermClicked = (term) => {
    if (!(term.key in scheduleMap)) {
      getIndividualCourseSchedule(term.key, subject, catalog_number)
        .then((data) => setScheduleMap({ ...scheduleMap, [term.key]: data[0] }))
        .catch((err) => setScheduleMap({ ...scheduleMap, [term.key]: null }));
    }
    setSelectedTerm(term);
  }

  const onFavouriteClicked = (e) => {
    e.stopPropagation();
    if (!favourite) {
      showSuccessNotif(`${courseName} has been favourited`);
    }
    setFavourite(!favourite);
  }

  const getScheduleTitle = () => `Schedule for ${courseName} in ${selectedTerm.value}`;

  const info = props.courseDescriptions[courseName] || {};

  return (
    <Container>
      <br/>
      <h4>Here's what we found for <strong>{courseName}-{info.title}</strong></h4>
      <hr/>
      <DetailCard 
        title={courseName}
        subtitle={info.title}
        content={info.description}
        prerequisites={info.prerequisites}
        antirequisites={info.antirequisites}
        showFavourite={!!props.favouriteCourses}
        isFavourite={favourite}
        onFavouriteClicked={onFavouriteClicked}/>
      <br/>
      <Row>
        {props.terms.map((t, idx) => (
          <Col key={idx}>
            <Button onClick={() => onTermClicked(t)} block>{t.value}</Button>
          </Col>
        ))}
      </Row>
      <br/>
      {selectedTerm && scheduleMap[selectedTerm.key] && 
        <Card>
          <Subtitle>{getScheduleTitle()}</Subtitle>
          <br/>
          <CourseSchedule course={scheduleMap[selectedTerm.key]} />
        </Card>
      }
    </Container>
  );
}

const mapStateToProps = (state) => ({
  favouriteCourses: state.session.user && state.session.user.favouriteCourses,
  terms: state.course.terms,
  ratingsMap: state.course.ratingsMap,
  courseDescriptions: state.course.descriptions,
});

const mapDispatchToProps = ({
  getTerms,
  getCourseDescription,
  updateFavouriteCourses
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetail);
