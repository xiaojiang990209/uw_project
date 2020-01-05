import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label, Input, Col, ModalHeader } from 'reactstrap';
import Select from '../../components/Select';
import { getTerms } from '../../ducks/course';
import { fetchBookingDates, fetchBookingBuildings, fetchBookingTable } from '../../ducks/uw';
import { createGroup } from '../../ducks/matchable';
import { StyledModal, StyledModalBody, FormWrapper, StyledFormGroup, StyledBookingTable } from './component';
import './css/modal.css';

function MatchableCreate(props) {
  const referral = props.location.state || {};
  const [selectedSubject, setSelectedSubject] = useState(referral.selectedSubject);
  const [selectedCourse, setSelectedCourse] = useState(referral.selectedCourse || "");
  const [selectedDay, setSelectedDay] = useState(referral.selectedDay);
  const [selectedGroupSize, setSelectedGroupSize] = useState(referral.selectedGroupSize);
  const [selectedHour, setSelectedHour] = useState(referral.selectedHour);
  const [selectedAm, setSelectedAm] = useState(referral.selectedAm);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [dates, setDates] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [bookingPage, setBookingPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
  const initializeBookingBuildings = () => {
    fetchBookingBuildings()
      .then(data => setBuildings(data.buildings))
      .catch(err => console.log(err));
  }

  const durations = ['0.5 hours', '1 hour', '1.5 hours', '2 hours', '2.5 hours', '3 hours'].map(selectMapper);
  const hour = [...Array(13).keys()].slice(1).map(selectMapper);
  const am = ['AM', 'PM'].map(selectMapper);
  const groupSizes = [...Array(13).keys()].slice(2).map(selectMapper);
  
  useEffect(initializeSubjects, []);
  useEffect(initializeBookingDates, []);
  useEffect(initializeBookingBuildings, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const date = new Date(selectedDay.value);
    const courseID = `${selectedSubject.value} ${selectedCourse}`;
    const hour = parseInt(selectedHour.value);
    date.setHours(selectedAm.value === 'AM' ? hour : hour + 12);
    const duration = parseInt(selectedDuration.value);
    const groupSize = parseInt(selectedGroupSize.value);
    createGroup(props.user.id, date, courseID, groupSize, duration)
      .then(data => props.history.push(`/matchable/groups/${data.id}`))
      .catch(err => setError(true));
  }

  const displayRoomStatus = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedBuilding) {
      return;
    }
    fetchBookingTable(selectedDay.value, selectedBuilding.value)
      .then(data => setBookingPage(data))
      .catch(err => console.log(err));
    setShowModal(!showModal);
  }

  return (
    <FormWrapper>
      <br/>
      <h4>Fill out the infomation below and create your own study group!</h4>
      <hr/>
      <Form onSubmit={onFormSubmit}>
        <StyledFormGroup row>
          <Label for="subject" md={2}>Subject</Label>
          <Col>
            <Select value={selectedSubject} onChange={setSelectedSubject} options={subjects} placeholder="Subject" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="courseCode" md={2}>Course code</Label>
          <Col>
              <Input id="courseCode" placeholder="Course code" value={selectedCourse} maxLength={3} required onChange={e => setSelectedCourse(e.target.value)}/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="maxMembers" md={2}>Max Group Size</Label>
          <Col>
            <Select value={selectedGroupSize} onChange={setSelectedGroupSize} options={groupSizes} placeholder="Group Size" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="dates" md={2}>Date</Label>
          <Col>
            <Select value={selectedDay} onChange={setSelectedDay} options={dates} placeholder="Date" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="duration" md={2}>Duration</Label>
          <Col>
            <Select value={selectedDuration} onChange={setSelectedDuration} options={durations} placeholder="Duration" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="time" md={2}>Time</Label>
          <Col md={3}>
            <Select value={selectedHour} onChange={setSelectedHour} options={hour} placeholder="Hour" required/>
          </Col>
          <Col md={3}>
            <Select value={selectedAm} onChange={setSelectedAm} options={am} placeholder="AM" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="building" md={2}>Building</Label>
          <Col>
            <Select value={selectedBuilding} onChange={setSelectedBuilding} options={buildings} placeholder="Building" required />
          </Col>
        </StyledFormGroup>
        <Button color="success" onClick={displayRoomStatus} block>Book room on UW website!</Button>
        <Button type="submit" color="success" block>Create!</Button>
      </Form>
      <StyledModal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          <span className="text-primary">{selectedBuilding ? selectedBuilding.label : ""}, {selectedDay ? selectedDay.label : ""}</span>
        </ModalHeader>
        <StyledModalBody>
          <StyledBookingTable dangerouslySetInnerHTML={{ __html: bookingPage }} />
        </StyledModalBody>
      </StyledModal>
    </FormWrapper>
  );
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  subjects: state.course.subjects
});

const mapDispatchToProps = ({
  getTerms
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchableCreate);
