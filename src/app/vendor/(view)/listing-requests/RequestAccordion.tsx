'use client';

import { useState } from 'react';
import { TableHeaderRow } from '@/components/ui';
import { capitalize } from 'lodash';
import { formatDate } from '@/utils/formatDate';
import { type PendingListingRequest } from '@/feature/vendor';
import { toast } from 'react-toastify';
import { useUpdateListingRequest } from '@/feature/listing';
import CaretUp from './_components/CaretUp';
import CaretDown from './_components/CaretDown';
import Link from 'next/link';

const RequestAccordion = ({
  requests,
}: {
  requests: PendingListingRequest[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {
    listing: { contentType, name },
  } = requests[0];

  const { mutate: updateRequest } = useUpdateListingRequest();

  const handleRequestUpdate = (
    requestId: string,
    action: 'approved' | 'rejected',
  ) => {
    updateRequest(
      { requestId, action },
      {
        onSuccess: () => {
          toast.success(`Request ${action} successfully`);
        },
      },
    );
  };

  return (
    <div className=' border-gray-300 bg-base-100 overflow-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-4 text-sm border-b-[0.5px] border-gray-300 items-center'>
        <div>
          <p className='text-gray-500 text-xs'>Name</p>
          <Link
            href={`/vendor/listing/edit/${requests[0].listing.id}?view=whitelist`}
          >
            <h3 className='font-semibold text-gray-700 truncate'>{name}</h3>
          </Link>
        </div>

        <div>
          <p className='text-gray-500 text-xs'>Type</p>
          <h3>{capitalize(contentType)}</h3>
        </div>

        <div className='flex gap-2 items-center justify-between md:justify-end'>
          <h3 className='text-gray-500 whitespace-nowrap'>
            Pending Requests:{' '}
            <span className='text-gray-800 font-semibold'>
              {requests.length}
            </span>
          </h3>
          <span className='cursor-pointer shrink-0' onClick={toggleDropdown}>
            {isOpen ? <CaretUp /> : <CaretDown />}
          </span>
        </div>
      </div>

      <div
        className={`inset-shadow-sm border-b border-gray-300 overflow-auto max-h-0 origin-top transition-all duration-300 ease-linear ${
          isOpen ? ' max-h-75' : ''
        }`}
      >
        <table className='table w-full overflow-x-auto'>
          <thead>
            <TableHeaderRow
              headings={[
                'Requesting Firm',
                'Requested By (user)',
                'Date Requested',
                'Status',
                'Actions',
              ]}
            />
          </thead>
          <tbody>
            {requests.map((request) => {
              return (
                <tr key={request.id} className='hover:bg-base-300'>
                  <td>{request.requestingFirm.name}</td>
                  <td>
                    {request.requestingUser.firstName}{' '}
                    {request.requestingUser.lastName}
                  </td>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>{capitalize(request.requestStatus)}</td>
                  <td>
                    <div className='flex gap-2'>
                      <button
                        className='btn btn-sm btn-outline border  border-gray-600 hover:border-primary-500 hover:text-primary-500 hover:bg-base-100'
                        onClick={() =>
                          handleRequestUpdate(request.id, 'rejected')
                        }
                      >
                        Reject
                      </button>
                      <button
                        className='btn btn-sm btn-outline border border-gray-600 hover:border-primary-500 hover:text-primary-500 hover:bg-base-100'
                        onClick={() =>
                          handleRequestUpdate(request.id, 'approved')
                        }
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAccordion;
