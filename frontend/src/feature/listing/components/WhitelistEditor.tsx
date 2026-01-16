'use client';

import FormSelect from '@/components/input/FormSelect';
import { TableHeaderRow, Loading } from '@/components/ui';
import { capitalize } from 'lodash';
import { formatDate } from '@/utils/formatDate';
import { getStatusClass } from '@/utils/ui-utils';
import { useQuery } from '@tanstack/react-query';
import { getListingRequests } from '../dbQueries';
import { useEffect, useState } from 'react';
import { useUpdateListingRequest } from '../hooks/useListingMutations';
import { toast } from 'react-toastify';

const optionsObj = {
  pending: 'Pending',
  completed: 'Completed',
};

const WhitelistEditor = ({ listingId }: { listingId: string }) => {
  const [view, setView] = useState<'pending' | 'completed'>('pending');
  const { mutate: updateRequest } = useUpdateListingRequest();

  const {
    data: requests,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['listing-request', listingId, view],
    queryFn: () => getListingRequests(listingId, view),
  });

  // useEffect(() => {
  //   refetch();
  // }, [view]);

  if (isLoading) return <Loading />;
  if (error || !requests) return <div>Error loading requests</div>;

  const headers = [
    'No.',
    'Requesting Firm',
    'Requesting User',
    'Request Date',
    ...(view === 'pending'
      ? ['Status', 'Action']
      : ['Actioned Date', 'Actioned By', 'Status']),
  ];

  const handleRequestUpdate = (
    requestId: string,
    action: 'approved' | 'rejected'
  ) => {
    updateRequest(
      { action, requestId },
      {
        onSuccess: () => {
          refetch();
          toast.success(`Request ${action} successfully`);
        },
      }
    );
  };

  return (
    <div className='flex flex-col gap-6 '>
      <FormSelect
        optionsObj={optionsObj}
        label='Status'
        displayAll={false}
        name='status'
        defaultValue={view}
        onSelect={(e) => setView(e.target.value as 'pending' | 'completed')}
      />

      {requests.length ? (
        <table className='table w-full rounded-md b-[0.5px] border-gray-400 shadow-sm overflow-auto'>
          <thead className='bg-base-300 rounded-md'>
            <TableHeaderRow headings={headers} />
          </thead>
          <tbody>
            {requests.map((request, index: number) => (
              <tr key={request.id} className='hover'>
                <td>{index + 1}</td>
                <td>{request.requestingFirm.name}</td>
                <td>
                  {request.requestingUser.firstName}{' '}
                  {request.requestingUser.lastName}
                </td>
                <td>{formatDate(request.createdAt)}</td>

                {request.requestStatus !== 'pending' && (
                  <>
                    <td>{formatDate(request.actionTime)}</td>
                    <td>
                      {request.actionedBy.firstName}{' '}
                      {request.actionedBy.lastName}
                    </td>
                  </>
                )}

                <td className='text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <span
                      aria-label='status'
                      className={`status ${getStatusClass(
                        request.requestStatus
                      )}`}
                    ></span>
                    {capitalize(request.requestStatus)}
                  </div>
                </td>

                {request.requestStatus === 'pending' && (
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p className='text-gray-600 text-center py-6'>
            No {view} requests found for this listing
          </p>
        </div>
      )}
    </div>
  );
};
export default WhitelistEditor;
