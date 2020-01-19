import React, { useEffect, useState } from 'react';
import Select from '../../../components/Select';
import { fetchBookingBuildings, fetchBookingTable } from '../../../ducks/uw';
import { StyledModal, StyledModalBody, StyledBookingTable, BookingFormHeader } from './components';
import './css/modal.css';

function BuildingBookingForm({date, value, isOpen, onClose}) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [bookingPage, setBookingPage] = useState(null);

  const initializeBookingBuildings = () => {
    fetchBookingBuildings()
      .then(data => {
        setBuildings(data.buildings);
        setSelectedBuilding(data.buildings[0]);
      })
      .catch(err => console.log(err));
  };

  const convertDateString = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
  }

  const displayRoomStatus = () => {
    if (!selectedBuilding) return;
    fetchBookingTable(convertDateString(date), selectedBuilding.value)
      .then(setBookingPage)
      .catch(console.log);
  };

  useEffect(initializeBookingBuildings, []);
  useEffect(displayRoomStatus, [selectedBuilding]);

  return (
    <StyledModal isOpen={isOpen} toggle={onClose}>
      <BookingFormHeader>
        <Select value={selectedBuilding} onChange={setSelectedBuilding} options={buildings} placeholder="Building" required />
      </BookingFormHeader>
      <StyledModalBody>
        <StyledBookingTable dangerouslySetInnerHTML={{ __html: bookingPage }} />
      </StyledModalBody>
    </StyledModal>
  );
}

export default BuildingBookingForm;
