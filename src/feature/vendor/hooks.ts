import { useQuery } from '@tanstack/react-query';
import { getVendorListingRequests } from './queries';
import { PendingListingRequest, CompletedListingRequest } from './types';

const useFirmListingRequests = (
  status: 'pending' | 'completed',
  requests: PendingListingRequest[] | CompletedListingRequest[]
) => {
  return useQuery({
    queryKey: ['listing-requests', status],
    queryFn: () => getVendorListingRequests(status),
    initialData: requests,
  });
};

export { useFirmListingRequests };
