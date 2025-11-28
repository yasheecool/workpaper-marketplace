import { useQuery } from '@tanstack/react-query';
import { getFirmCreatedListings } from '@/lib/api/firm';

//get the current firm's created listings i.e the listings that the firm owns
const useFirmCreatedListings = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['firm', 'created-listings'],
    queryFn: getFirmCreatedListings,
    select: (data) => data.data,
  });

  return { data, error, isLoading };
};

export default useFirmCreatedListings;
