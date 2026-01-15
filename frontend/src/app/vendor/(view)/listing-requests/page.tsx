import PendingRequests from './PendingRequests';
import CompletedRequests from './CompletedRequests';
import { Tabs } from '@/components/ui';
import {
  CompletedListingRequest,
  getVendorListingRequests,
  PendingListingRequest,
} from '@/feature/vendor';

const ListingRequests = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { view = 'pending' } = await searchParams;
  const requests = await getVendorListingRequests(
    view === 'pending' ? 'pending' : 'completed'
  );

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

        {view === 'pending' && (
          <PendingRequests requests={requests as PendingListingRequest[]} />
        )}
        {view === 'completed' && (
          <CompletedRequests requests={requests as CompletedListingRequest[]} />
        )}
      </div>
    </div>
  );
};

export default ListingRequests;
