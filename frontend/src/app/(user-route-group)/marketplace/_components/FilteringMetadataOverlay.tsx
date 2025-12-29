'use client';

import { ListingSearchFilters } from '@/feature/listing';
import { useState } from 'react';

const FilteringMetadataOverlay = () => {
  const [showOverlay, setShowOverlay] = useState<Boolean>(false);

  return (
    <>
      {/* FILTERING METADATA + OVERLAY TOGGLE BUTTON */}
      <div className='flex items-center justify-between mb-4'>
        {/* {Boolean(totalPages) && (
            )} */}
        <span className='text-sm font-semibold'>
          Showing {1} – {4} of {94} results{' '}
          <span className='text-sm font-semibold text-gray-600'>
            ( Page {1} of {1})
          </span>
        </span>

        <button
          className='btn btn-primary justify-self-end min-[992px]:hidden hover:bg-secondary-700'
          onClick={() => setShowOverlay(!showOverlay)}
        >
          Filter
        </button>
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
