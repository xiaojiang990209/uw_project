import axios from 'axios';

export const getPosts = ({ type, city, limit, timestamp }) => {
  if (!limit) limit = '';
  if (!timestamp) timestamp = '';
  const queryString = `type=${type}&city=${city}&limit=${limit}&created_at=${timestamp}`;
  return axios.get(`/api/posts?${queryString}`).then((res) => res.data);
};
