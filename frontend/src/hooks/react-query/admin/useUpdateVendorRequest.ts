import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { updateVendorRequest } from '@/lib/api/admin';

interface MutationType {
  requestId: string;
  action: 'approved' | 'rejected';
}
//approve or reject vendor request - done by the admin
const useUpdateVendorRequest = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['update-vendor-request'],
    mutationFn: ({ requestId, action }: MutationType) =>
      updateVendorRequest({ requestId, action }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['firm'],
      });
      queryClient.invalidateQueries({
        queryKey: ['vendor-requests'],
      });
    },
  });

  return { mutate, data, isSuccess };
};

export default useUpdateVendorRequest;
