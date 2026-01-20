import { useQuery } from '@tanstack/react-query';
import { getListingById } from '../dbQueries';
import { ListingWithStatuses } from '../types';

//should be changed when - saving, installing, requesting a listing
export const useListingById = (
  id: string,
  initialData?: ListingWithStatuses
) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListingById(id),
    initialData,
  });
};
