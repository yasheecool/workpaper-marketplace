import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { requestListing } from '@/lib/api/listing';

//request a listing from the vendor
const useRequestListing = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['request-listing'],
    mutationFn: (listingId: string) => requestListing(listingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['requested-listings'],
      });
    },
  });

  return { mutate, data };
};

export default useRequestListing;
