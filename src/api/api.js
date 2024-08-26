import axios from 'axios';

// 创建 Axios 实例
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // 替换为实际API的URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 权限验证拦截器
api.interceptors.request.use(config => {
  const apiKey = 'YOUR_API_KEY'; // 替换为你的API Key
  config.headers['X-API-Key'] = apiKey;
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
