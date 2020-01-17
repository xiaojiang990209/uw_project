import axios from 'axios';

const SESSION_PATH = 'users';

const sessionClient = {
  register: (user) => axios.post(`/api/${SESSION_PATH}/register`, user),
  login: (user) => axios.post(`/api/${SESSION_PATH}/login`, user),
  saveFavouriteCourses: (favouriteCourses) =>
    axios.put(`/api/${SESSION_PATH}/favouriteCourses`, { favouriteCourses }),
};

export default sessionClient;
