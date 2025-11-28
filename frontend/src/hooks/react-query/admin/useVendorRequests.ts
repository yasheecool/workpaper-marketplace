import { useQuery } from '@tanstack/react-query';
import { getVendorRequests } from '@/lib/api/admin';

//Get vendor requests  for admin dashboard
const useVendorRequests = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['vendor-requests'],
    queryFn: getVendorRequests,
    select: (data) => {
      const requests = data.vendorRequests.reduce(
        (acc: Record<string, any>, val: Record<string, any>) => {
          if (val.requestStatus === 'pending') {
            acc.pending.push(val);
          } else if (val.requestStatus === 'approved') {
            acc.approved.push(val);
          } else if (val.requestStatus === 'rejected') {
            acc.rejected.push(val);
          }
          acc.all.push(val);
          return acc;
        },
        {
          all: [],
          pending: [],
          approved: [],
          rejected: [],
        }
      );
      return requests;
    },
  });
  return { data, error, isLoading };
};

export default useVendorRequests;
