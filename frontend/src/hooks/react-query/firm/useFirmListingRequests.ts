import { useQuery } from '@tanstack/react-query';
import { getFirmListingRequests } from '@/lib/api/firm';

// in the backend, the status of a request could be pending, approved, or rejected. However, completed is used to represent that the request has been either approved or rejected.
const useFirmListingRequests = (status: 'pending' | 'completed') => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['firm', 'listing-requests', status],
    queryFn: () => getFirmListingRequests(status),
    select: (data) => data.data,
  });

  return { data, error, isLoading };
};

export default useFirmListingRequests;
