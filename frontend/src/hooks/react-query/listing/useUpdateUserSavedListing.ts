import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { updateUserSavedListings } from '@/lib/api/listing';

const useUpdateUserSavedListings = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['update-user-saved-listings'],
    mutationFn: ({
      listingId,
      action,
    }: {
      listingId: string;
      action: 'save' | 'unsave';
    }) => {
      return updateUserSavedListings(listingId, action);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['saved-listings'],
      });
      // console.log('Saved Listings:', data);
    },
  });

  return { mutate, data, isSuccess };
};

export default useUpdateUserSavedListings;
