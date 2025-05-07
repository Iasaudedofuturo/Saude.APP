import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-sus-saude.herokuapp.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptar requisições para adicionar token se existir
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@SUSApp:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;