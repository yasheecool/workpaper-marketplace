import axios from 'axios';
import useAppStore from '@/store/appStore';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use(
  (config) => {
    const state = useAppStore.getState();

    if (!state.jwt) {
      return Promise.reject(new Error('No JWT token found. Please log in.'));
    }

    if (state.jwt) config.headers['Authorization'] = JSON.stringify(state.jwt);
    if (state.currentFirm) config.headers['X-Firm-Id'] = state.currentFirm.id;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
