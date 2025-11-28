import { useQuery } from '@tanstack/react-query';
import { getMarketplaceListings } from '@/lib/api/listing';

//used to populate the main marketplace page with all the listings available in the marketplace
const useMarketplaceListings = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['marketplace-listings'],
    queryFn: getMarketplaceListings,
    staleTime: Infinity,
    select: (data) => data.data,
  });

  return { data, error, isLoading };
};

export default useMarketplaceListings;
