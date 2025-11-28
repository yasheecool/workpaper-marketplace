import { useQuery } from '@tanstack/react-query';
import { getFirm } from '@/lib/api/firm';

//firmId param is also undefined because it is being called from the AuthGuard component, which checks if the state is hydrated from local-storage and if the firmId is available. If a different approach is used in AuthGuard, this can be removed and will result in firmId always being a string

//Get the current firm
export const useFirm = (firmId: string | undefined) => {
  const { data, error, isLoading, status } = useQuery({
    queryKey: ['firm', firmId],
    queryFn: getFirm,
    select: (data) => data.data,
    enabled: !!firmId, //query will only run if firmId resolves to TRUE
  });

  return { data, error, isLoading, status };
};

export default useFirm;
