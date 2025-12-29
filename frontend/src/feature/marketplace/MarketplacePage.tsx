'use client';

import HeroSection from './HeroSection';
import SearchFilters from './SearchFilters';
import { ListingCard } from '@/feature/listing';
import { ListingType } from '@/types/schema';
import { useFilteredListings } from '@/hooks/useFilteredListings';
import { useEffect, useState } from 'react';
import Pagination from '@/components/ui/Pagination';
import useAppStore from '@/store/appStore';
import Loading from '@/components/ui/Loading';
import Container from '@/components/layout/Container';

const MarketplacePage = () => {
  // const {
  //   listings: { data: filteredListings, count },
  //   page,
  //   totalPages,
  //   start,
  //   end,
  //   isLoading,
  // } = useFilteredListings();
  // const resetFilters = useAppStore((s) => s.resetFilters);
  // const setPage = useAppStore((s) => s.setPage);

  const [showOverlay, setShowOverlay] = useState<Boolean>(false);

  // useEffect(() => {
  //   return () => resetFilters(); // Reset filters when component unmounts
  // }, []);

  return (
    <>
      {/* Hero Section contains searchbar */}
      <HeroSection />

      <section className='py-18 bg-base-200 text-base-content'>
        {/* <Container>

        </Container> */}
        <div className='section-container px-4 grid grid-cols-1 grid-rows-[auto_1fr] items-start min-[992px]:grid-cols-[auto_1fr] min-[992px]:grid-rows-[auto_1fr] gap-x-6 gap-y-2'>
          {/* FILTERING SIDEBAR */}
          <SearchFilters />

          {/* FILTERING METADATA */}
          <div className='flex items-center justify-between min-[992px]:col-start-2 min-[992px]:col-end-3 min-[992px]:row-start-1'>
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
              ${false ? 'block opacity-100' : 'hidden'}
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
              <SearchFilters />
            </div>
          </div>

          {/* LISTING DISPLAY + PAGINATION */}
          <div className='pt-5 grid grid-cols-1 gap-6 min-[992px]:col-start-2 min-[992px]:grid-rows-2'>
            {/* {isLoading ? (
            <Loading />
          ) : count === 0 ? (
            <p>
              {' '}
              No listings matched your search criteria. Please try a different
              set of filters or search term.
            </p>
          ) : (
            filteredListings.map((listing: ListingType) => {
              return <ListingCard key={listing.id} listing={listing} />;
            })
          )} */}
            {/* PAGINATION */}

            <ListingCard />
            <ListingCard />
            <ListingCard />
            <Pagination
              totalPages={5}
              currentPage={1}
              setCurrentPage={() => {}}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default MarketplacePage;
