import { useQuery } from '@tanstack/react-query';
import { getListingById } from '../dbQueries';
import { ListingWithoutStatuses, ListingWithStatuses } from '../types';

//should be changed when - saving, installing, requesting a listing
export const useListingById = (
  id: string,
  initialData?: ListingWithStatuses | ListingWithoutStatuses,
) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListingById(id, true), //harcoded for now
    initialData,
  });
};
