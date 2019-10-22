import axios from 'axios';

const SESSION_PATH = 'users';

const sessionClient = {
  register: (user) => axios.post(`/${SESSION_PATH}/register`, user),
  login: (user) => axios.post(`${SESSION_PATH}/login`, user),
};

export default sessionClient;
