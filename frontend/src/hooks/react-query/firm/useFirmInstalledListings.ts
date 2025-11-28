import { useQuery } from '@tanstack/react-query';
import { getInstalledListings } from '@/lib/api/firm';

//get the current firm's installed listings i.e the listings that are installed in the firm
const useFirmInstalledListings = () => {
  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ['installed-listings'],
    queryFn: getInstalledListings,
    select: (data) => data.data,
  });

  return { data, error, isSuccess, isLoading };
};

export default useFirmInstalledListings;
