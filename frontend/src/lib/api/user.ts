import api from '../axiosInstance';
import { UserProfileType } from '@/types/schema';

export const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const getSavedListings = async () => {
  const response = await api.get('/saved-listings');
  return response.data;
};

export const getUserFirms = async () => {
  const response = await api.get('/user/firms');
  return response.data;
};

export const updateUserProfile = async (
  updatedFields: Partial<UserProfileType>
) => {
  const response = await api.patch('/user/profile', {
    updatedFields,
  });
  return response.data;
};
