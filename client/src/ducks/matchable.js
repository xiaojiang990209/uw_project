import axios from 'axios';

export const matchGroup = (maxMembers, courseID, date, hasTime) => {
  const body = { maxMembers, courseID, date, hasTime };
  return axios.post('/api/matchable/current-groups', body);
}