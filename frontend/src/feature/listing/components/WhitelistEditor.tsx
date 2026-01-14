'use client';

import FormSelect from '@/components/input/FormSelect';
import { TableHeaderRow } from '@/components/ui';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import { formatDate } from '@/utils/formatDate';
import { toast } from 'react-toastify';
import { getStatusClass } from '@/utils/ui-utils';

const options = {
  pending: 'Pending',
  completed: 'Completed',
};

const WhitelistEditor = ({ listing }: { listing: Record<string, any> }) => {
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');

  const headers = [
    'No.',
    'Requesting Firm',
    'Requesting User',
    'Request Date',
    ...(status === 'pending'
      ? ['Status', 'Action']
      : ['Actioned Date', 'Actioned By', 'Status']),
  ];

  return <p>Under refactor</p>;

  const {
    data: requests,
    error,
    isLoading,
    refetch,
  } = useListingRequests(listing.id, status);

  const { mutate: updateRequest } = useUpdateListingRequest();

  useEffect(() => {
    refetch();
  }, [status]);

  const handleRequestUpdate = (
    requestId: string,
    action: 'approve' | 'reject'
  ) => {
    updateRequest(
      { action, requestId },
      {
        onSuccess: (data) => {
          refetch();
          toast.success(`Request ${data.data.requestStatus} successfully`);
        },
      }
    );
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading requests</div>;

  return (
    <div className='flex flex-col gap-6 '>
      <FormSelect
        optionsObj={options}
        label='Status'
        value={status}
        setStateValue={setStatus}
      />

      {/* TODO: Wrap this table by a TableWrapper */}
      {requests.length ? (
        <table className='table w-full rounded-md b-[0.5px] border-gray-400 shadow-sm overflow-auto'>
          <thead className='bg-base-300 rounded-md'>
            <TableHeaderRow headings={headers} />
          </thead>
          <tbody>
            {requests.map((request: Record<string, any>, index: number) => (
              <tr key={request.id} className='hover'>
                <td>{index + 1}</td>
                <td>{request.requestingFirm.firmName}</td>
                <td>
                  {request.requestingUser.firstName}{' '}
                  {request.requestingUser.lastName}
                </td>
                <td>{formatDate(request.requestTime)}</td>
                {status !== 'pending' && (
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p className='text-gray-600 text-center py-6'>
            No {status} requests found for this listing
          </p>
        </div>
      )}
    </div>
  );
};
export default WhitelistEditor;
