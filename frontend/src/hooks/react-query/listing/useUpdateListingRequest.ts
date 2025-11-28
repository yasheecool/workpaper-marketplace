import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { updateListingRequest } from '@/lib/api/listing';

//reject or approve a listing request - done by the vendor
const useUpdateListingRequest = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['update-listing-request'],
    mutationFn: ({
      action,
      requestId,
    }: {
      action: 'approve' | 'reject';
      requestId: string;
    }) => updateListingRequest(action, requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['firm', 'listing-requests'],
      });
    },
  });

  return { mutate, data, isSuccess };
};

export default useUpdateListingRequest;
