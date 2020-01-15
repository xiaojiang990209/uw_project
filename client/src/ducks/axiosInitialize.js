import axios from 'axios';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = token;
    }
    console.log(config);
    return config;
  }, function (error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
  });
