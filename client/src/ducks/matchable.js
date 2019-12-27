import axios from 'axios';
import withNotification from '../utils/sendNotification';
import { CREATE_GROUP_MESSAGE, MATCH_GROUP_MESSAGE, UPDATE_GROUP_MESSAGE } from './constants';

export const matchGroup = (userID, maxMembers, courseID, date, hasTime) => {
  const body = { userID, maxMembers, courseID, date, hasTime };
  return withNotification(MATCH_GROUP_MESSAGE)(axios.post('/api/matchable/current-groups', body));
}

export const joinGroup = (groupID, userID) => {
  const body = { groupID, userID };
  return withNotification(UPDATE_GROUP_MESSAGE)(axios.post('/api/matchable/update-group', body));
}

export const createGroup = (userID, startDate, courseID, groupSize, duration) => {
  const body = { userID, groupSize, startDate, courseID, duration };
  return withNotification(CREATE_GROUP_MESSAGE)(axios.post('/api/matchable/groups', body).then(res => res.data));
}

export const getGroup = (groupId) =>
  axios.get(`/api/matchable/groups/${groupId}`).then(res => res.data);
