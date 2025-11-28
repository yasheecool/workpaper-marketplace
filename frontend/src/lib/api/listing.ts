import api from '../axiosInstance';
import { ListingType, ListingInputType } from '@/types/schema';

export const getListing = async (listingId: string) => {
  const response = await api.get(`/listings/${listingId}`);
  return response.data;
};

export const getListingRequests = async (
  listingId: string,
  status: 'pending' | 'completed'
) => {
  const response = await api.get(
    `/listings/${listingId}/requests?status=${status}`
  );
  return response.data;
};

export const getMarketplaceListings = async () => {
  const response = await api.get('/listings/marketplace-listings');
  return response.data;
};

export const updateListing = (
  listingId: string,
  updatedFields: Partial<ListingType>
) => {
  return api.patch(`/listings/${listingId}`, {
    updatedFields,
  });
};

export const createListing = (listing: ListingInputType) => {
  return api.post(`/listings`, {
    listing,
  });
};

//for a vendor firm, to approve or reject a listing request from a user firm
export const updateListingRequest = async (
  action: 'approve' | 'reject',
  requestId: string
) => {
  const response = await api.patch(`/listing-requests/${requestId}`, {
    action,
  });
  console.log('updateListingRequest response', response.data);
  return response.data;
};

//for a user firm, to install/uninstall a listing
export const updateInstalledListing = (
  listingId: string,
  action: 'install' | 'uninstall'
) => {
  if (action === 'install') return api.post(`/installed-listings/${listingId}`);

  if (action === 'uninstall')
    return api.delete(`/installed-listings/${listingId}`);

  return Promise.reject(new Error('Invalid action'));
};

export const requestListing = (listingId: string) =>
  api.post(`/requested-listings/${listingId}`);

export const updateUserSavedListings = (
  listingId: string,
  action: 'save' | 'unsave'
): Promise<any> => {
  if (action === 'save') return api.post(`/saved-listings/${listingId}`);
  if (action === 'unsave') return api.delete(`/saved-listings/${listingId}`);
  return Promise.reject(new Error('Invalid action'));
};
