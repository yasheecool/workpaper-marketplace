import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { getUserFirms } from '@/lib/api/user';

//get the firms that the user is associated with, used to populate the firm selection page and allow user to set firm context
const useUserFirms = (enabled: boolean) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-firms'],
    queryFn: getUserFirms,
    select: (data) => data.data,
    enabled, // query will only run if enabled is TRUE
  });

  if (data) {
    data.forEach((firm: Record<string, any>) => {
      queryClient.setQueryData(['firm', firm.firmId], firm);
    });
  }
  return { data, isLoading, isError };
};

export default useUserFirms;
