import axios from 'axios';

export const fetchNews = () => {
  return axios.get('/api/news').then((res) => res.data);
};

export const fetchImportantDates = () => {
  return axios.get('/api/importantdates').then((res) => res.data);
};

export const fetchInfoSessions = () => {
  return axios.get('/api/infosession').then((res) => res.data);
};

export const fetchBookingDates = () => {
  return axios.get('/api/library/dates').then((res) => res.data);
};

export const fetchBookingBuildings = () => {
  return axios.get('/api/library/buildings').then((res) => res.data);
};

export const fetchBookingTable = (selectedDay, selectedBuilding) => {
  return axios
    .get(`/api/library/rooms?day=${selectedDay}&area=${selectedBuilding}`)
    .then((res) => res.data);
};
