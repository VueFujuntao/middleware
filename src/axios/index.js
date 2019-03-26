import Axios from 'axios';
// 请求时间
Axios.defaults.timeout = 500;
// Axios.defaults.baseURL = 'http://172.20.10.2:12460';
// Axios.defaults.baseURL = 'http://localhost:12460';
Axios.defaults.baseURL = 'http://192.168.43.93:12460';

// 请求过滤
Axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应过滤
Axios.interceptors.response.use(data => {
  return data;
}, error => {
  return Promise.reject(error);
});

export default Axios;