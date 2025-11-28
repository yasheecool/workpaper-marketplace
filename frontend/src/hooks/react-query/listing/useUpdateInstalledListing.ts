import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { updateInstalledListing } from '@/lib/api/listing';

interface MutationParams {
  listingId: string;

  action: 'install' | 'uninstall';
}

//Hook to install or uninstall a listing for the firm
const useUpdateFirmInstalledListings = () => {
  const { data, mutate, isSuccess, isPending } = useMutation({
    mutationKey: ['install-uninstall-listing'], //should be conditional
    mutationFn: ({ listingId, action }: MutationParams) =>
      updateInstalledListing(listingId, action),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['installed-listings'],
      });
    },
  });

  return { mutate, isPending };
};

export default useUpdateFirmInstalledListings;
