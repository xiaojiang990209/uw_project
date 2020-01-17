import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
