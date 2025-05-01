import axios from 'axios';
import useAppStore from '@/store/appStore';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  const state = useAppStore.getState();
  console.log(state);

  if (state.jwt) config.headers['Authorization'] = JSON.stringify(state.jwt);
  if (state.currentFirm) config.headers['X-Firm-Id'] = state.currentFirm.id;

  return config;
});

export default api;
