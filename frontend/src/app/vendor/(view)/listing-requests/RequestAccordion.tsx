import { useState } from 'react';
import { TableHeaderRow } from '../../../../components/ui/TableRows';
import { capitalize } from 'lodash';
import { formatDate } from '@/utils/formatDate';
import { useUpdateListingRequest } from '@/hooks/react-query/listing';
import { toast } from 'react-toastify';
import Link from 'next/link';

const RequestAccordion = ({ requests }: { requests: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {
    listing: { contentType, name },
    listingId,
  } = requests[0];
  // console.log(requests[0]);
  const { mutate: updateRequest } = useUpdateListingRequest();

  const handleRequestUpdate = (
    requestId: string,
    action: 'approve' | 'reject'
  ) => {
    updateRequest(
      { action, requestId },
      {
        onSuccess: (data) => {
          toast.success(`Request ${data.data.requestStatus} successfully`);
        },
      }
    );
  };

  return (
    <div className=' border-gray-300 bg-base-100 overflow-hidden'>
      <div className='flex items-center gap-4 px-4 py-4 text-sm border-b-[0.5px] border-gray-300'>
        <div>
          <p className='text-gray-500 text-xs'>Name</p>
          <Link href={`/vendor/listing/edit/${listingId}`}>
            <h3 className='text-blk truncate link link-hover'>{name}</h3>
          </Link>
        </div>

        <div className='ml-auto w-24'>
          <p className='text-gray-500 text-xs'>Type</p>
          <h3>{capitalize(contentType)}</h3>
        </div>

        <div className='flex gap-1 items-center justify-self-end'>
          <h3 className='text-gray-500'>
            Pending Requests:{' '}
            <span className='text-gray-800'>{requests.length}</span>
          </h3>
          <span className='cursor-pointer' onClick={toggleDropdown}>
            {isOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m4.5 15.75 7.5-7.5 7.5 7.5'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m19.5 8.25-7.5 7.5-7.5-7.5'
                />
              </svg>
            )}
          </span>
        </div>
      </div>

      <div
        className={`inset-shadow-sm border-b-1 border-gray-300 overflow-auto max-h-0 origin-top transition-all duration-300 ease-linear ${
          isOpen ? ' max-h-[300px]' : ''
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
                  <td>{request.requestingFirm.firmName}</td>
                  <td>
                    {request.requestingUser.firstName}{' '}
                    {request.requestingUser.lastName}
                  </td>
                  <td>{formatDate(request.requestTime)}</td>
                  <td>{capitalize(request.requestStatus)}</td>
                  <td>
                    <div className='flex gap-2'>
                      <button
                        className='btn btn-sm btn-outline border-1  border-gray-600 hover:border-primary-500 hover:text-primary-500 hover:bg-base-100'
                        onClick={() =>
                          handleRequestUpdate(request.id, 'reject')
                        }
                      >
                        Reject
                      </button>
                      <button
                        className='btn btn-sm btn-outline border-1 border-gray-600 hover:border-primary-500 hover:text-primary-500 hover:bg-base-100'
                        onClick={() =>
                          handleRequestUpdate(request.id, 'approve')
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
