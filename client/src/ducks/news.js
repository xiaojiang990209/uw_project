import axios from 'axios';

export const fetchNews = () => {
  return axios.get('/api/news')
    .then(resp => resp.data);
}