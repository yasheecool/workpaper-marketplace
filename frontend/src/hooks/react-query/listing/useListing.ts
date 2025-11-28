import { useQuery } from '@tanstack/react-query';
import { getListing } from '@/lib/api/listing';

const useListing = (listingId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['listing', listingId],
    queryFn: async () => getListing(listingId),
    enabled: !!listingId, //query will only run if listingId resolves to TRUE
    select: (data) => data.data,
  });

  return { listing: data, error, isLoading };
};

export default useListing;
