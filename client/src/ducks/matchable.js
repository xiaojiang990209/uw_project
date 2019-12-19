import axios from 'axios';
import withNotification from '../utils/sendNotification';
import { CREATE_GROUP_MESSAGE } from './constants';

export const matchGroup = (maxMembers, courseID, date, hasTime) => {
  const body = { maxMembers, courseID, date, hasTime };
  return axios.post('/api/matchable/current-groups', body);
}

export const createGroup = (startDate, courseID, groupSize, duration, userID) => {
  const body = { groupSize, startDate, courseID, duration, userID };
  return withNotification(CREATE_GROUP_MESSAGE)(axios.post('/api/matchable/groups', body));
}
