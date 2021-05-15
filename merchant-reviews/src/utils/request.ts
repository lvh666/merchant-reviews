import axios from 'axios';
import { message } from 'antd';

export const BASE_URL = 'http://localhost:7001';
// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // api的base_url
  timeout: 40000, // request timeoutheaders: { 'Content-Type': 'application/x-www-form-urlencoded' },
  headers: { 'Content-Type': 'application/json'}
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const arr = ['user', 'comment', 'uploadPic', 'shop', 'order']
    const url = config.url as string
    const token = localStorage.getItem('token')
    if (arr.includes(url.split('/')[1])) {
      config.headers = {'Authorization':`Bearer ${token}`}
    }
    return config;
  },
  (error) => {
    // message.info('network request error:' + error);
    Promise.reject(error);
  },
);

// respone interceptor
service.interceptors.response.use(
  (response) => {
    message.destroy();
    if (response.data.code === 401) {
      if (response.data.error === 'jwt malformed') {
        message.warning('请先登录');
        localStorage.removeItem('login')
        window.location.href = '/login';
      }
    }
    return response.data;
  },
  (error) => {
    message.info('network error:' + error.message);
    return Promise.reject(error);
  },
);

export default service;
