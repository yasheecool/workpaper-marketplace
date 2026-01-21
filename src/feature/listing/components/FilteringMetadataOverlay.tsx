'use client';

import { ListingSearchFilters } from '@/feature/listing';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilteringMetadataOverlayProps {
  count: number;
  currentPage: number;
  totalPages: number;
  itemsOnPage: number;
}

const FilteringMetadataOverlay = ({
  count,
  currentPage,
  totalPages,
  itemsOnPage,
}: FilteringMetadataOverlayProps) => {
  const [showOverlay, setShowOverlay] = useState<Boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Calculate the range of items being displayed
  const perPage = 10; // Should match the perPage value in queries.ts
  const startItem = count > 0 ? (currentPage - 1) * perPage + 1 : 0;
  const endItem = Math.min(currentPage * perPage, count);

  // Get current sort from URL, default to 'name'
  const currentSort = searchParams.get('sort') || 'name';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {/* FILTERING METADATA + SORT & FILTER BUTTONS */}
      <div className='flex items-center justify-between mb-4'>
        {count > 0 ? (
          <span className='text-sm font-semibold'>
            Showing {startItem} – {endItem} of {count} results{' '}
            <span className='text-sm font-semibold text-gray-600'>
              (Page {currentPage} of {totalPages})
            </span>
          </span>
        ) : (
          <span className='text-sm font-semibold text-gray-600'>
            No results found
          </span>
        )}

        {/* SORT AND FILTER BUTTONS FLEX CONTAINER */}
        <div className='flex gap-2 items-center'>
          {/* SORT DROPDOWN - VISIBLE ON ALL SCREEN SIZES */}
          <select
            value={currentSort}
            onChange={handleSortChange}
            className='select select-bordered select-sm'
          >
            <option value='name'>Name (A-Z)</option>
            <option value='updated_at'>Last Updated</option>
          </select>

          {/* FILTER BUTTON - HIDDEN ON DESKTOP */}
          <button
            className='btn btn-primary btn-sm min-[992px]:hidden hover:bg-secondary-700'
            onClick={() => setShowOverlay(!showOverlay)}
          >
            Filter
          </button>
        </div>
      </div>
      {/* FILTERING OVERLAY */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-10 opacity-0  transition-opacity duration-300 ease-in-out min-[992px]:hidden flex flex-col items-center justify-center 
              ${showOverlay ? 'block opacity-100' : 'hidden'}
              `}
      >
        {/* CLOSE BUTTON FOR OVERLAY */}
        <button
          className='absolute top-4 right-4 cursor-pointer'
          onClick={() => setShowOverlay(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6 hover:scale-120 transition-transform duration-200'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </button>

        <div className='flex flex-col gap-4 items-center w-sm'>
          <ListingSearchFilters />
        </div>
      </div>
    </>
  );
};
export default FilteringMetadataOverlay;
