import { useQuery } from '@tanstack/react-query';
import { getListingById } from '../dbQueries';
import { ListingWithStatuses } from '../types';

export const useListingById = (id: string, initialData?: ListingWithStatuses) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListingById(id),
    initialData,
  });
};
