'use client';

import { useEffect } from 'react';
import { TableHeaderRow } from '@/components/ui';
import Loading from '@/components/ui/Loading';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import { getStatusClass } from '@/utils/ui-utils';
import Link from 'next/link';
import { CompletedListingRequest } from '@/feature/vendor';
import { useFirmListingRequests } from '@/feature/vendor';

const headings = [
  'No.',
  'Listing Name',
  'Requesting Firm',
  'Actioned By',
  'Actioned At',
  'Status',
];

const CompletedRequests = ({
  requests,
}: {
  requests: CompletedListingRequest[];
}) => {
  const {
    data = [],
    isLoading,
    error,
  } = useFirmListingRequests('completed', requests);

  if (isLoading) return <Loading />;

  if (error) return <div>Error loading requests</div>;

  if (data.length === 0) {
    return <p className='p-4'>No completed requests found.</p>;
  }

  return (
    <div className='rounded-md border shadow-sm border-base-300 overflow-auto'>
      <table className='table rounded-md'>
        <thead className='bg-base-200'>
          <TableHeaderRow headings={headings} />
        </thead>
        <tbody>
          {data.map((request, idx) => {
            console.log(request);
            return (
              <tr key={request.id} className='hover:bg-base-100'>
                <td>{idx + 1}</td>
                <td className='font-semibold'>
                  <Link
                    href={`/vendor/listing/edit/${request.listing.id}`}
                    className='link link-hover text-gray-800'
                  >
                    {request.listing.name}
                  </Link>
                </td>
                <td>{request.requestingFirm.name}</td>
                <td>
                  {request.actionedBy?.firstName} {request.actionedBy?.lastName}
                </td>
                <td>{formatDate(request.actionTime as string)}</td>
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedRequests;
