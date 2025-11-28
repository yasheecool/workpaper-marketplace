import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { UserProfileType } from '@/types/schema';
import { updateUserProfile } from '@/lib/api/user';

const useUpdateUserProfile = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['update-user-profile'],
    mutationFn: (updatedFields: Partial<UserProfileType>) =>
      updateUserProfile(updatedFields),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });

  return { mutate, data, isSuccess };
};
export default useUpdateUserProfile;
