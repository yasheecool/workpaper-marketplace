import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { sendVendorRequest } from '@/lib/api/firm';

const useSendVendorRequest = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['send-vendor-request'],
    mutationFn: (requestForm: Record<string, any>) =>
      sendVendorRequest(requestForm),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['firm'],
      });
    },
  });

  return { mutate, data, isSuccess };
};
export default useSendVendorRequest;
