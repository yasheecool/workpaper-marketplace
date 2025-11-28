import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { createListing } from '@/lib/api/listing';
import { ListingInputType } from '@/types/schema';

const useCreateListing = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['create-listing'],
    mutationFn: (listing: ListingInputType) => createListing(listing),
    onSuccess: (data) => {
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

export default useCreateListing;
