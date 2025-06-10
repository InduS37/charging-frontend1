import axios from 'axios';

console.log("✅ API Base URL:", import.meta.env.VITE_API_BASE_URL);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
