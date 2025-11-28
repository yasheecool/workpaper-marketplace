import { useEffect } from 'react';
import { TableHeaderRow } from '../../../../components/ui/TableRows';
import { useFirmListingRequests } from '@/hooks/react-query/firm';
import Loading from '@/components/ui/Loading';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import { getStatusClass } from '@/utils/ui-utils';
import Link from 'next/link';

const headings = [
  'No.',
  'Listing Name',
  'Requesting Firm',
  'Actioned By',
  'Actioned At',
  'Status',
];

const CompletedRequests = () => {
  const { data: requests, isLoading } = useFirmListingRequests('completed');

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='rounded-md border-1 shadow-sm border-base-300 overflow-auto'>
      <table className='table rounded-md'>
        <thead className='bg-base-200'>
          <TableHeaderRow headings={headings} />
        </thead>
        <tbody>
          {!!requests.totalRequests &&
            requests.listingRequests.map(
              (request: Record<string, any>, idx: number) => {
                console.log(request);
                return (
                  <tr key={request.id} className='hover:bg-base-100'>
                    <td>{idx + 1}</td>
                    <td className='font-semibold'>
                      <Link
                        href={`/vendor/listing/edit/${request.listingId}`}
                        className='link link-hover text-gray-800'
                      >
                        {request.listing.name}
                      </Link>
                    </td>
                    <td>{request.requestingFirm.firmName}</td>
                    <td>
                      {request.actionedBy.firstName}{' '}
                      {request.actionedBy.lastName}
                    </td>
                    <td>{formatDate(request.actionTime)}</td>
                    <td className='text-gray-600'>
                      <div className='flex items-center gap-2'>
                        <span
                          aria-label='status'
                          className={`status ${getStatusClass(
                            request?.requestStatus
                          )}`}
                        ></span>
                        {capitalize(request.requestStatus)}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};
export default CompletedRequests;
