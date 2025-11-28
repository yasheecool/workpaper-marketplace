import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api/user';

const useUser = () => {
  const { data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    select: (data) => data.data,
  });

  return { data, error };
};

export default useUser;
