import axios from 'axios';
import withNotification from '../utils/sendNotification';
import { CREATE_GROUP_MESSAGE, MATCH_GROUP_MESSAGE, UPDATE_GROUP_MESSAGE } from './constants';

//side effects
export const getGroups = (subject = null) => {
  const route = subject
    ? `/api/matchable/groups/${subject.toUpperCase()}`
    : '/api/matchable/groups';
  return withNotification(MATCH_GROUP_MESSAGE)(axios.get(route).then((res) => res.data));
};

export const getGroup = (groupId) =>
  axios.get(`/api/matchable/group/${groupId}`).then((res) => res.data);

export const updateGroup = (groupID, users) => {
  const body = { users };
  return withNotification(UPDATE_GROUP_MESSAGE)(
    axios.patch(`/api/matchable/groups/${groupID}`, body)
  );
};

export const updatePosts = (groupID, postData) => {
  const body = { postData };
  return withNotification(UPDATE_GROUP_MESSAGE)(
    axios.post(`/api/matchable/groups/${groupID}/posts`, body)
  );
};

// const { groupName, description, subject, courseId, groupSize, time, location } = req.body;
export const createGroup = (registedData) => {
  const body = registedData;
  return withNotification(CREATE_GROUP_MESSAGE)(
    axios.post('/api/matchable/groups', body).then((res) => res.data)
  );
};
