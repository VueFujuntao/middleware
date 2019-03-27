import Axios from 'axios';
import {
  message
} from 'antd';
// 请求时间
Axios.defaults.timeout = 500;
Axios.defaults.baseURL = 'http://172.20.10.2:12460/dataSource';
// Axios.defaults.baseURL = 'http://localhost:12460';
// Axios.defaults.baseURL = 'http://192.168.43.93:12460';

// 请求过滤
Axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应过滤
Axios.interceptors.response.use(data => {
  if (data.data.code === 200) {
    return data;
  } else {
    message.error(data.data.msg);
  }
}, error => {
  return Promise.reject(error);
});

export default Axios;