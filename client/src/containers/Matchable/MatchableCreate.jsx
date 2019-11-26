import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label, Input, Col, ModalHeader } from 'reactstrap';
import Select from '../../components/Select';
import { getTerms } from '../../ducks/course';
import { fetchBookingDates, fetchBookingBuildings, fetchBookingTable } from '../../ducks/uw';
import { matchGroup } from '../../ducks/matchable';
import { StyledModal, StyledModalBody, FormWrapper, StyledFormGroup } from './component';
import './css/modal.css';

function MatchableCreate(props) {
  const referral = props.location.state;
  const [selectedSubject, setSelectedSubject] = useState(referral.selectedSubject);
  const [selectedCourse, setSelectedCourse] = useState(referral.selectedCourse || "");
  const [selectedDay, setSelectedDay] = useState(referral.selectedDay);
  const [selectedHour, setSelectedHour] = useState(referral.selectedHour);
  const [selectedAm, setSelectedAm] = useState(referral.selectedAm);
  const [selectedGroupSize, setSelectedGroupSize] = useState(referral.selectedGroupSize);
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
  const initializeBookingTable = () => {
    fetchBookingTable()
      .then(data => setBookingPage(data))
      .catch(err => console.log(err));
  }

  const hour = [...Array(13).keys()].slice(1).map(selectMapper);
  const am = ['AM', 'PM'].map(selectMapper);
  const groupSizes = [...Array(13).keys()].slice(2).map(selectMapper);
  
  useEffect(initializeSubjects, []);
  useEffect(initializeBookingDates, []);
  useEffect(initializeBookingBuildings, []);
  useEffect(initializeBookingTable, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const date = new Date(selectedDay.value);
    if (selectedHour && selectedAm) {
      const hour = parseInt(selectedHour.value);
      date.setHours(selectedAm.value === 'AM' ? hour : hour + 12);
    }
    const courseID = `${selectedSubject.value} ${selectedCourse}`;
    matchGroup(selectedGroupSize.value, courseID, date, !!selectedHour && !!selectedAm)
      // .then(res => console.log(res.status))
      // .catch(err => setError(err));
  }

  return (
    <FormWrapper>
      <br/>
      <h4>Fill out the infomation below and create your own study group!</h4>
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
        <StyledFormGroup row>
          <Label for="building" md={3}>Building</Label>
          <Col>
            <Select value={selectedBuilding} onChange={setSelectedBuilding} options={buildings} placeholder="Building" required />
          </Col>
        </StyledFormGroup>
        <Button color="success" onClick={() => setShowModal(!showModal)} block>Book room on UW website!</Button>
        <Button type="submit" color="success" block>Create!</Button>
      </Form>
      <StyledModal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        <ModalHeader toggle={() => setShowModal(!showModal)}>Booking Page</ModalHeader>
        <StyledModalBody>
          <div dangerouslySetInnerHTML={{ __html: bookingPage }} />
        </StyledModalBody>
      </StyledModal>
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
)(MatchableCreate);
