'use client';

import SummaryCard from '@/components/ui/SummaryCard';
import { useState, useMemo } from 'react';
import Tabs from '@/components/ui/Tabs';
import Loading from '@/components/ui/Loading';
import TableWrapper from '@/app/admin/requests/TableWrapper';

import { useVendorRequests } from '@/hooks/react-query/admin';

const AdminPage = () => {
  const [view, setView] = useState<'pending' | 'approved' | 'rejected' | 'all'>(
    'all'
  );

  //check the query's select function in the queries.ts file to see how the data is transformed
  const { data: requests, isLoading } = useVendorRequests();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <header>
        <h2 className='text-2xl font-semibold'>View Vendor Requests Here</h2>
        <p className='text-sm text-gray-600 mt-2'>
          Manage and review all vendor requests.
        </p>
      </header>
      {/* SUMMARY CARDS */}
      <div className='mt-8 mb-4'>
        <div className='flex gap-4 items-center'>
          <SummaryCard
            Icon={() => (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            )}
            label='Pending Requests'
            value={requests['pending'].length} // Example value, replace with actual data
            style='flex-1'
          />
          <SummaryCard
            Icon={() => (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            )}
            label='Approved Requests'
            value={requests['approved'].length} // Example value, replace with actual data
            style='flex-1'
          />
          <SummaryCard
            Icon={() => (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            )}
            label='Rejected Requests'
            value={requests['rejected'].length} // Example value, replace with actual data
            style='flex-1'
          />
        </div>
      </div>

      {/* TABS */}
      <Tabs
        tabs={[
          {
            label: 'All',
            onClick: () => setView('all'),
            isActive: view === 'all',
          },
          {
            label: 'Pending',
            onClick: () => setView('pending'),
            isActive: view === 'pending',
          },
          {
            label: 'Approved',
            onClick: () => setView('approved'),
            isActive: view === 'approved',
          },
          {
            label: 'Rejected',
            onClick: () => setView('rejected'),
            isActive: view === 'rejected',
          },
        ]}
      />
      {/* TABLE */}
      <div className='rounded-md overflow-x-auto w-full'>
        {requests[view].length ? (
          <TableWrapper requests={requests[view]} view={view} />
        ) : (
          <div className='flex items-center justify-center mt-8'>
            No requests available.
          </div>
        )}
      </div>
    </section>
  );
};
export default AdminPage;
