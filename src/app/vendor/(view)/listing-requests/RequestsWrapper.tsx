import PendingRequests from './PendingRequests';
import CompletedRequests from './CompletedRequests';
import {
  CompletedListingRequest,
  getVendorListingRequests,
  PendingListingRequest,
} from '@/feature/vendor';

const RequestsWrapper = async ({ view }: { view: 'pending' | 'completed' }) => {
  const requests = await getVendorListingRequests(
    view === 'pending' ? 'pending' : 'completed',
  );

  return (
    <>
      {view === 'pending' && (
        <PendingRequests requests={requests as PendingListingRequest[]} />
      )}
      {view === 'completed' && (
        <CompletedRequests requests={requests as CompletedListingRequest[]} />
      )}
    </>
  );
};
export default RequestsWrapper;
