'use client';

import RequestAccordion from './RequestAccordion';
import SummaryCard from '@/components/ui/SummaryCard';
import { useState, useEffect } from 'react';
import { PendingListingRequest } from '@/feature/vendor';
import { groupBy } from 'lodash';
import Loading from '@/components/ui/Loading';
import { useFirmListingRequests } from '@/feature/vendor';

type GroupedRequests = {
  [listingName: string]: PendingListingRequest[];
};

const PendingRequests = ({
  requests,
}: {
  requests: PendingListingRequest[];
}) => {
  // const [groupedRequests, setGroupedRequests] =
  //   useState<GroupedRequests | null>(null);

  const { data, isLoading, error } = useFirmListingRequests(
    'pending',
    requests,
  );

  const groupedRequests = data ? groupBy(data, (r) => r.listing.name) : null;

  // useEffect(() => {
  //   if (data) {
  //     const grouped = groupBy(data, (r) => r.listing.name);
  //     setGroupedRequests(grouped as GroupedRequests);
  //   }
  // }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className='text-red-500'>Error loading requests</div>;
  }

  return (
    <>
      {/* OVERVIEW - Summary Cards */}
      <div className='grid grid-cols-2 gap-4 p-4 py-6 rounded-md border border-base-300 bg-base-100 shadow-sm '>
        <h1 className='text-xl font-semibold col-span-2'>Overview</h1>

        <SummaryCard
          Icon={() => {
            return (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 text-primary-100'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
                />
              </svg>
            );
          }}
          label='Listings Requested'
          value={Object.keys(groupedRequests || {}).length}
        />

        <SummaryCard
          Icon={() => {
            return (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 text-primary-100'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            );
          }}
          label='Total Requests'
          value={data.length}
        />
      </div>

      {isLoading && (
        <div className='flex justify-center items-center h-75'>
          <Loading />
        </div>
      )}

      {error && <div className='text-red-500'>Error loading requests</div>}

      {/* LISTING REQUESTS */}
      {groupedRequests && Object.keys(groupedRequests).length > 0 && (
        <div className='bg-base-200 rounded-md shadow-sm border border-base-300 flex flex-col'>
          <h2 className='font-semibold text px-4 py-2 border-b border-gray-300'>
            Listing Requests
          </h2>

          {groupedRequests &&
            Object.entries(groupedRequests).map(([listingName, requests]) => (
              <RequestAccordion
                key={listingName}
                requests={requests as PendingListingRequest[]}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default PendingRequests;
