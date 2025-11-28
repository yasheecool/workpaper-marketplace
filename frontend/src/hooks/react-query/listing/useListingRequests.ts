import { useQuery } from '@tanstack/react-query';
import { getListingRequests } from '@/lib/api/listing';

// Get the requests for a specific listing based on its ID and status (pending or completed) - for the vendor to view requests of their listings
const useListingRequests = (
  listingId: string,
  status: 'pending' | 'completed'
) => {
  console.log('useListingRequests', listingId, status);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['listing', listingId, 'requests', status],
    queryFn: () => getListingRequests(listingId, status),
    select: (data) => data.requests,
  });

  return { data, error, isLoading, refetch };
};

export default useListingRequests;
