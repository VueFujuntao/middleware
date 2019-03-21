import Axios from 'axios';

Axios.defaults.timeout = 500;
Axios.defaults.baseURL = 'http://localhost:12460';

Axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

Axios.interceptors.response.use(data => {
  return data;
}, error => {
  return Promise.reject(error);
})

export default Axios;