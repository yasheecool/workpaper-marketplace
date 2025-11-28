import { TableHeaderRow } from '@/components/ui/TableRows';
import { useState } from 'react';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import { useUpdateVendorRequest } from '@/hooks/react-query/admin';
import { toast } from 'react-toastify';
import InfoBlock from '../../../components/ui/InfoBlock';
import Modal from '@/components/ui/Modal';
import { getStatusClass } from '@/utils/ui-utils';

type Props = {
  requests: Record<string, any>[];
  view: 'all' | 'pending' | 'approved' | 'rejected';
};

const TableWrapper = ({ requests, view }: Props) => {
  const [selectedRequest, setSelectedRequest] = useState<Record<
    string,
    any
  > | null>(null);

  const { mutate: updateRequest } = useUpdateVendorRequest();

  const handleRequestUpdate = (
    requestId: string,
    action: 'approved' | 'rejected'
  ) => {
    updateRequest(
      { requestId, action },
      {
        onSuccess: (data) => {
          toast.success(`Request ${action} successfully!`);
        },
      }
    );

    setSelectedRequest(null);
  };

  return (
    <>
      {/* MODAL DISPLAY */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
        >
          <h3 className='font-semibold text-lg border-b-[0.5px] border-primary-300  py-3 px-4'>
            Request Details
          </h3>
          <div className='mx-auto p-6 bg-white rounded-2xl space-y-8'>
            {/* Request Info */}
            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b-1 border-gray-300 pb-2'>
                Request Info
              </h3>
              <div className='grid grid-cols-2 gap-x-6 gap-y-6'>
                <InfoBlock
                  label='Requesting Firm'
                  value={selectedRequest.requestedByFirm.firmName}
                />
                <InfoBlock
                  label='Requested By'
                  value={`${selectedRequest.requestedByUser.firstName} ${selectedRequest.requestedByUser.lastName}`}
                />
                <InfoBlock
                  label='Requested Date'
                  value={formatDate(selectedRequest.requestedAt)}
                />
                <InfoBlock
                  label='Status'
                  value={
                    <span className='flex items-center gap-2'>
                      <span
                        className={`status ${getStatusClass(selectedRequest.requestStatus)}`}
                      />
                      {capitalize(selectedRequest.requestStatus)}
                    </span>
                  }
                />
              </div>
            </div>
            {/* Firm Contact Info */}
            <div>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b-1 border-gray-300 pb-2'>
                Firm Contact Details
              </h3>
              <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
                <InfoBlock label='Email' value={selectedRequest.contactEmail} />
                <InfoBlock label='Phone' value={selectedRequest.contactPhone} />
              </div>
            </div>
            {/* Action Buttons */}
            {selectedRequest.requestStatus === 'pending' && (
              <div className='flex justify-end gap-2'>
                <button
                  className='btn btn-sm  btn-outline'
                  onClick={() =>
                    handleRequestUpdate(selectedRequest.requestId, 'rejected')
                  }
                >
                  Reject
                </button>
                <button
                  className='btn btn-sm  btn-outline'
                  onClick={() =>
                    handleRequestUpdate(selectedRequest.requestId, 'approved')
                  }
                >
                  Approve
                </button>
              </div>
            )}
          </div>{' '}
        </Modal>
      )}
      <table className='table border-[0.5px] border-gray-200 rounded-md mt-6 shadow-sm text-gray-800'>
        <thead className='bg-base-200 rounded-md'>
          <TableHeaderRow
            headings={[
              'No.',
              'Requesting Firm',
              'Requested Date',
              'Status',
              'Actioned By',
              'Actioned On',
              'Details',
            ]}
          />
        </thead>
        <tbody>
          {requests.map((request: Record<string, any>, idx: number) => {
            const {
              requestedAt,
              requestStatus,
              requestedByFirm,
              actionedByUser,
              actionedAt,
            } = request;

            return (
              <tr key={idx}>
                <td className='text-gray-600'>{idx + 1}</td>
                <td>{requestedByFirm.firmName}</td>
                <td className='text-gray-600'>{formatDate(requestedAt)}</td>
                <td className='text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <span
                      aria-label='status'
                      className={`status ${getStatusClass(requestStatus)}`}
                    ></span>
                    {capitalize(requestStatus)}
                  </div>
                </td>
                <td>
                  {actionedByUser?.firstName} {actionedByUser?.lastName}
                </td>
                <td>
                  {requestStatus !== 'pending' ? formatDate(actionedAt) : ''}
                </td>

                <td>
                  <button
                    className='btn btn-sm text-primary-500 hover:bg-primary-500 hover:text-white btn-outline'
                    onClick={() => {
                      setSelectedRequest(request);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default TableWrapper;
