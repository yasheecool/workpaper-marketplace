import { useQuery } from '@tanstack/react-query';
import { getVendorListingRequests } from './queries';
import { ListingRequest } from './types';

const useFirmListingRequests = (
  status: 'pending' | 'completed',
  requests: ListingRequest[]
) => {
  return useQuery({
    queryKey: ['listing-requests', status],
    queryFn: () => getVendorListingRequests(status),
    initialData: requests,
  });
};

export { useFirmListingRequests };
