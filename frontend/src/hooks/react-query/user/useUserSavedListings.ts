import { getSavedListings } from '@/lib/api/user';
import { useQuery } from '@tanstack/react-query';

const useUserSavedListings = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['saved-listings'],
    queryFn: getSavedListings,
    select: (data) => data.savedListings,
  });

  return { data, error, isLoading };
};

export default useUserSavedListings;
