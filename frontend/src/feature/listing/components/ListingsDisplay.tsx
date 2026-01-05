'use client';

import { getMarketplaceListings } from '../dbQueries';
import FilteringMetadataOverlay from './FilteringMetadataOverlay';
import Listings from './Listings';
import Pagination from '@/components/ui/Pagination';
import { useQuery } from '@tanstack/react-query';

const ListingsDisplay = ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
  initialData?: Awaited<ReturnType<typeof getMarketplaceListings>>;
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['marketplace-listings', params],
    queryFn: () => getMarketplaceListings(params),
  });

  if (isLoading) {
    return (
      <div className='flex justify-center py-39'>
        <span className='loading loading-spinner loading-xl'></span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='text-red-500'>
        Error loading listings: {error?.message}
      </div>
    );
  }
  const { data: listings, count, totalPages, currentPage } = data;

  return (
    <>
      <FilteringMetadataOverlay
        count={count || 0}
        currentPage={currentPage || 1}
        totalPages={totalPages || 0}
        itemsOnPage={count || 0}
      />
      {/* LISTING DISPLAY + PAGINATION */}
      <div className='pt-5 grid grid-cols-1 gap-6 min-[992px]:col-start-2 min-[992px]:grid-rows-2'>
        <Listings listings={listings} />

        {/* PAGINATION */}
        <Pagination
          totalPages={totalPages || 0}
          currentPage={currentPage || 1}
        />
      </div>
    </>
  );
};

export default ListingsDisplay;
