import axios from 'axios';
import utilsStorage from '@/utils/storage'

const api = axios.create({
  baseURL: 'http://192.168.1.6:3400'
});

api.interceptors.request.use((config) => {
  const token = utilsStorage.obterTokenNaStorage();
  config.headers.Authorization = token;
  return config
});

export default api;