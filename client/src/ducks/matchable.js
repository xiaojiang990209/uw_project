import axios from 'axios';
import { withNotification } from '../utils/sendNotification';

export const matchGroup = (maxMembers, courseID, date, hasTime) => {
  const body = { maxMembers, courseID, date, hasTime };
  return axios.post('/api/matchable/current-groups', body);
}

export const createGroup = (startDate, courseID, groupSize, duration, userID) => {
  const body = { groupSize, startDate, courseID, duration, userID };
  return withNotification(
    'Group created successfully',
    'Failed to create group',
    'Creating group'
  )(axios.post('/api/matchable/groups', body));
}
