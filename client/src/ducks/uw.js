import axios from 'axios';

export const fetchNews = () => {
  return axios.get('/api/news')
    .then(res => res.data);
}

export const fetchImportantDates = () => {
  return axios.get('/api/importantdates')
    .then(res => res.data);
}

export const fetchInfoSessions= () => {
  return axios.get('/api/infosession')
    .then(res => res.data);
}