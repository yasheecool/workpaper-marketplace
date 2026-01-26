import { Tabs } from '@/components/ui';

import RequestsWrapper from './RequestsWrapper';
import { Suspense } from 'react';
import { Loading } from '@/components/ui';

const ListingRequests = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { view = 'pending' } = await searchParams;

  const tabs = [
    {
      label: 'Pending',
      href: '?view=pending',
      isActive: view === 'pending',
    },
    {
      label: 'Completed',
      href: '?view=completed',
      isActive: view === 'completed',
    },
  ];

  return (
    <div className='text-gray-800'>
      <div className='p-4 flex flex-col gap-8'>
        {/* TABS */}
        <div>
          <Tabs tabs={tabs} />
        </div>
        <Suspense fallback={<Loading />}>
          <RequestsWrapper view={view as 'pending' | 'completed'} />
        </Suspense>
      </div>
    </div>
  );
};

export default ListingRequests;
