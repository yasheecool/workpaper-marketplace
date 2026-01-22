import { useQuery } from '@tanstack/react-query';
import { getSavedListings } from '../dbQueries';
import { type SavedListing } from '../types';

const useSavedListings = (initialData: SavedListing[]) => {
  return useQuery({
    queryKey: ['saved-listings'],
    queryFn: getSavedListings,
    initialData: initialData,
  });
};

export { useSavedListings };
