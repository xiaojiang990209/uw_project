import React, { useEffect, useState } from 'react';
import { Button, Form, Label, Input, Col, ModalHeader, Container } from "reactstrap";
import Select from '../../../../components/Select';
import { fetchBookingDates, fetchBookingBuildings, fetchBookingTable } from '../../../../ducks/uw';
import { StyledModal, StyledModalBody, FormWrapper, StyledFormGroup, StyledBookingTable } from './components';
import './css/modal.css';
import { StyledFormGroup } from "./components";

function BuildingBookingForm({date, value, onChange}) {
  const referral = props.location.state || {};
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [dates, setDates] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [bookingPage, setBookingPage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const selectMapper = (e) => ({ value: e, label: e });

  const initializeBookingDates = () => {
    fetchBookingDates()
      .then(data => setDates(data.dates.map(selectMapper)))
      .catch(err => console.log(err));
  };

  const initializeBookingBuildings = () => {
    fetchBookingBuildings()
      .then(data => setBuildings(data.buildings))
      .catch(err => console.log(err));
  };

  useEffect(initializeBookingDates, []);
  useEffect(initializeBookingBuildings, []);



  const displayRoomStatus = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedBuilding) {
      return;
    }
    fetchBookingTable(selectedDay.value, selectedBuilding.value)
      .then(data => setBookingPage(data))
      .catch(err => console.log(err));
    setShowModal(!showModal);
  };


  return (
    <>
      <StyledFormGroup>
        <label>Building</label>
          <Select value={selectedBuilding} onChange={setSelectedBuilding} options={buildings} placeholder="Building" required />
      </StyledFormGroup>
      <StyledModal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          <span className="text-primary">{selectedBuilding ? selectedBuilding.label : ""}, {selectedDay ? selectedDay.label : ""}</span>
        </ModalHeader>
        <StyledModalBody>
          <StyledBookingTable dangerouslySetInnerHTML={{ __html: bookingPage }} />
        </StyledModalBody>
      </StyledModal>
      <Button color="success" onClick={displayRoomStatus} block>Book room on UW website!</Button>
    </>
  );
}

export default BuildingBookingForm;
