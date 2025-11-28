import api from '../axiosInstance';
import { VendorProfileType } from '@/types/schema';

export const getFirm = async () => {
  const response = await api.get('/firm');
  return response.data;
};

export const getInstalledListings = async () => {
  const response = await api.get('/installed-listings');
  return response.data;
};

//for a user firm, to get the listings they have requested from vendors
export const getRequestedListings = async () => {
  const response = await api.get('/requested-listings');
  return response.data;
};

//for a vendor firm, to get the listing requests from user firms
export const getFirmListingRequests = async (
  status: 'pending' | 'completed'
) => {
  const response = await api.get(`/listing-requests?status=${status}`);
  return response.data;
};

export const getVendorProfile = async (firmId: string) => {
  const response = await api.get(`/firm/${firmId}/vendor-profile`);
  return response.data;
};

export const getFirmCreatedListings = async () => {
  const response = await api.get('/firm/created-listings');
  return response.data;
};

//get content to create a listing
export const getFirmContent = async () => {
  const response = await api.get('/firm/content');
  return response.data;
};

export const updateVendorProfile = async (
  vendorForm: Partial<VendorProfileType>
) => {
  const response = await api.patch(`/firm/vendor-profile`, {
    updatedFields: vendorForm,
  });
  return response.data;
};

export const sendVendorRequest = (requestForm: Record<string, any>) => {
  return api.post('/vendor-request', {
    requestForm,
  });
};
