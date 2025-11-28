import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { updateListing } from '@/lib/api/listing';
import { ListingType } from '@/types/schema';

interface MutationParams {
  listingId: string;
  updatedFields: Partial<ListingType>;
}

//update a listing - done by the vendor
const useUpdateListing = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['update-listing'],
    mutationFn: ({ listingId, updatedFields }: MutationParams) =>
      updateListing(listingId, updatedFields),

    onSuccess: (data, { listingId }) => {
      queryClient.invalidateQueries({
        queryKey: ['listing', listingId],
      });

      queryClient.invalidateQueries({
        queryKey: ['firm', 'created-listings'],
      });
      queryClient.invalidateQueries({
        queryKey: ['marketplace-listings'],
      });
    },
  });

  return { mutate, data, isSuccess };
};

export default useUpdateListing;
