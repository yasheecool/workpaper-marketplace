import { useQuery } from '@tanstack/react-query';
import { getAvailableContent } from '../dbQueries';
import { ListingContent } from '../types';

const useListingContent = (content?: ListingContent[]) => {
  return useQuery({
    queryKey: ['listing-content'],
    queryFn: getAvailableContent,
    ...(content ? { initialData: content } : {}),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export { useListingContent };
