import { useQuery } from '@tanstack/react-query';
import { getRequestedListings } from '@/lib/api/firm';

//for a user firm, get the listings that they have requested from vendors on the marketplace
const useFirmRequestedListings = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['requested-listings'],
    queryFn: getRequestedListings,
    select: (data) => data.data,
  });

  return { data, error, isLoading };
};

export default useFirmRequestedListings;
