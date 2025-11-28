import RequestAccordion from './RequestAccordion';
import SummaryCard from '@/components/ui/SummaryCard';
import { useFirmListingRequests } from '@/hooks/react-query/firm';
import { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import Loading from '@/components/ui/Loading';

const PendingRequests = () => {
  const { data, isLoading } = useFirmListingRequests('pending');
  //The data received from the API is just an object containing requests. So in order to display them in a an accordion, we need to group them by listingId and then display under the accordion of that listingId
  const [groupedRequests, setGroupedRequests] = useState<Record<
    string,
    any
  > | null>(null);

  useEffect(() => {
    if (data) {
      const grouped = groupBy(data.listingRequests, (r) => r.listingId);
      setGroupedRequests(grouped);
      console.log(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* OVERVIEW - Summary Cards */}
      <div className='grid grid-cols-2 gap-4 p-4 py-6 rounded-md border-1 border-base-300 bg-base-100 shadow-sm '>
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
          value={data?.listingsRequestedCount}
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
          value={data?.totalRequests}
        />
      </div>

      {/* LISTING REQUESTS */}
      {!!data.totalRequests && (
        <div className='bg-base-200 rounded-md shadow-sm border-1 border-base-300 flex flex-col'>
          <h2 className='font-semibold text px-4 py-2 border-b border-gray-300'>
            Listing Requests
          </h2>
          {!groupedRequests && (
            <div className='flex justify-center items-center h-[300px]'>
              <span className='loading loading-spinner loading-md'></span>
            </div>
          )}

          {groupedRequests &&
            Object.entries(groupedRequests).map(([listingId, requests]) => (
              <RequestAccordion key={listingId} requests={requests} />
            ))}
        </div>
      )}
    </>
  );
};
export default PendingRequests;
