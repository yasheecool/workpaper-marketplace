import { useMutation } from '@tanstack/react-query';
import { VendorProfileType } from '@/types/schema';
import { queryClient } from '@/lib/queryClient';
import { updateVendorProfile } from '@/lib/api/firm';

const useUpdateVendorProfile = (firmId: string) => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['update-vendor-profile'],
    mutationFn: (updatedFields: Partial<VendorProfileType>) =>
      updateVendorProfile(updatedFields),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['firm', firmId, 'vendorProfile'],
      });
    },
  });

  return { mutate, data };
};

export default useUpdateVendorProfile;
