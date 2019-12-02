import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label, Input, Col } from 'reactstrap';
import Select from '../../components/Select';
import { getTerms } from '../../ducks/course';
import { fetchBookingDates } from '../../ducks/uw';
import { matchGroup } from '../../ducks/matchable';
import { FormWrapper, StyledFormGroup } from './component';

function MatchableJoin(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedAm, setSelectedAm] = useState(null);
  const [selectedGroupSize, setSelectedGroupSize] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [error, setError] = useState(null);

  const selectMapper = (e) => ({ value: e, label: e });

  const subjects = (props.subjects || []).map(selectMapper);

  const initializeSubjects = () => {
    if (!props.subjects) {
      props.getTerms();
    }
  };
  const initializeBookingDates = () => {
    fetchBookingDates()
      .then(data => setDates(data.dates.map(selectMapper)))
      .catch(err => console.log(err));
  }

  const hour = [...Array(13).keys()].slice(1).map(selectMapper);
  const am = ['AM', 'PM'].map(selectMapper);
  const groupSizes = [...Array(13).keys()].slice(2).map(selectMapper);

  useEffect(initializeSubjects, []);
  useEffect(initializeBookingDates, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const date = new Date(selectedDay.value);
    if (selectedHour && selectedAm) {
      const hour = parseInt(selectedHour.value);
      date.setHours(selectedAm.value === 'AM' ? hour : hour + 12);
    }
    const courseID = `${selectedSubject.value} ${selectedCourse}`;
    matchGroup(selectedGroupSize.value, courseID, date, !!selectedHour && !!selectedAm)
      .then(res => { if (!res.data.exactMatch.length && !res.data.fuzzyMatch.length) setError(true); })
      .catch(err => setError(err));
  }

  const redirectOnError = () => {
    props.history.push('/matchable/create', {
      selectedSubject,
      selectedCourse,
      selectedDay,
      selectedHour,
      selectedAm,
      selectedGroupSize
    });
  };

  const groupNotFoundErrorBlock = (
    <Button color="danger" onClick={redirectOnError} outline block>
        Oops didn't find you with any group! Would you like to start one instead?
    </Button>
  );

  return (
    <FormWrapper>
      <br/>
      <h4>Looking for study buddies? Fill out the form below!</h4>
      <hr/>
      <Form onSubmit={onFormSubmit}>
        <StyledFormGroup row>
          <Label for="subject" md={3}>Subject</Label>
          <Col>
            <Select value={selectedSubject} onChange={setSelectedSubject} options={subjects} placeholder="Subject" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="courseCode" md={3}>Course code</Label>
          <Col>
              <Input id="courseCode" placeholder="Course code" value={selectedCourse} maxLength={3} required onChange={e => setSelectedCourse(e.target.value)}/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="maxMembers" md={3}>Max Group Size</Label>
          <Col>
            <Select value={selectedGroupSize} onChange={setSelectedGroupSize} options={groupSizes} placeholder="Group Size" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="dates" md={3}>Date</Label>
          <Col>
            <Select value={selectedDay} onChange={setSelectedDay} options={dates} placeholder="Date" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="time" md={3}>Time (Optional)</Label>
          <Col md={3}>
            <Select value={selectedHour} onChange={setSelectedHour} options={hour} placeholder="Hour" />
          </Col>
          <Col md={3}>
            <Select value={selectedAm} onChange={setSelectedAm} options={am} placeholder="AM" />
          </Col>
        </StyledFormGroup>
        <Button block type="submit" color="success">Find!</Button>
        { error && groupNotFoundErrorBlock }
      </Form>
    </FormWrapper>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.course.subjects
});

const mapDispatchToProps = ({
  getTerms
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchableJoin);

