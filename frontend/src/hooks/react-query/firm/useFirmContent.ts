import { useQuery } from '@tanstack/react-query';
import { getFirmContent } from '@/lib/api/firm';

//get the current firm's content for creating a listing
const useFirmContent = () => {
  console.log('useFirmContent hook called');
  const { data, error, isLoading } = useQuery({
    queryKey: ['firm', 'availableContentforCreateListing'],
    queryFn: getFirmContent,
    select: (data) => data.data,
  });
  return { data, error, isLoading };
};

export default useFirmContent;
