import { TableHeaderRow } from '@/components/ui/TableRows';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import { useListingActions } from '@/hooks/react-query/helperHooks';
import { toast } from 'react-toastify';
import Ellipsis from '@/components/ui/Ellipsis';
import Tooltip from '@/components/ui/Tooltip';
import Link from 'next/link';
import { getStatusClass } from '@/utils/ui-utils';

const TableWrapper = ({
  records,
  currentStatus,
}: {
  records: any[];
  currentStatus: 'installed' | 'requested';
}) => {
  const { installUninstallListing } = useListingActions();

  const handleUninstall = (listingId: string) => {
    installUninstallListing(
      { listingId, action: 'uninstall' },
      {
        onSuccess: () => {
          toast.success('Listing uninstalled successfully!');
        },
        onError: () => {
          toast.error('Failed to uninstall listing.');
        },
      }
    );
  };

  const headings = [
    'No.',
    'Name',
    'Vendor Name',
    'Type',
    ...(currentStatus === 'installed'
      ? ['Install Date', 'Installed By', 'Actions']
      : ['Request Date', 'Requested By', 'Status', 'Info']),
  ];

  const dataTip: Record<
    'pending' | 'approved' | 'rejected' | 'deleted',
    string
  > = {
    pending: 'The request is pending approval. Please check back later.',
    approved:
      'The request has been approved. You can proceed with the installation.',
    rejected:
      'The request has been rejected. Please contact the vendor support for more information.',
    deleted:
      'This listing has been marked as deleted by the vendor and is no longer available.',
  };

  return (
    <>
      {records?.length ? (
        <table className='table border-[0.5px] border-gray-200 rounded-md'>
          <thead className='bg-base-200 '>
            <TableHeaderRow headings={headings} />
          </thead>

          <tbody>
            {records.map((record: any, idx: number) => {
              const {
                listing: { ownedByFirm, name, contentType, status },
                listingId,
                installTime,
                requestTime,
                installedByUser,
                requestingUser,
                requestStatus,
              } = record;

              return (
                <tr
                  key={idx}
                  className={`${status === 'deleted' ? 'opacity-75' : ''}`}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <div className='flex items-center gap-2'>
                      <Link href={`/listing/${listingId}`}>
                        <span className='link link-hover font-semibold text-gray-800'>
                          {name}
                        </span>
                      </Link>
                      {/* if the listing is deleted, show a tooltip with info */}
                      {status === 'deleted' && (
                        <div
                          className='tooltip tooltip-top z-10'
                          data-tip={dataTip.deleted}
                        >
                          <span className='text-red-500 text-sm ml-2 flex items-center gap-1'>
                            <Tooltip />
                            (unavailable)
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link href={`/vendor/${ownedByFirm.id}`}>
                      <span className='link link-hover'>
                        {ownedByFirm.firmName}
                      </span>
                    </Link>
                  </td>
                  <td>{capitalize(contentType)}</td>
                  {currentStatus === 'installed' && (
                    <>
                      <td>{formatDate(installTime)}</td>
                      <td>
                        {installedByUser.firstName} {installedByUser.lastName}
                      </td>
                      <td className='text-gray-600'>
                        <div className='flex items-center justify-start'>
                          <Ellipsis
                            actions={[
                              {
                                label: 'Uninstall',
                                action: () => handleUninstall(listingId),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </>
                  )}

                  {currentStatus === 'requested' && (
                    <>
                      <td>{formatDate(requestTime)}</td>
                      <td>
                        {requestingUser.firstName} {requestingUser.lastName}
                      </td>

                      <td className='text-gray-600'>
                        <div className='flex items-center gap-2'>
                          <span
                            aria-label='status'
                            className={`status ${getStatusClass(
                              requestStatus
                            )}`}
                          ></span>
                          {capitalize(requestStatus)}
                        </div>
                      </td>
                      <td>
                        <div
                          className='tooltip tooltip-left'
                          data-tip={
                            dataTip[requestStatus as keyof typeof dataTip]
                          }
                        >
                          <Tooltip />
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No {currentStatus} listings.</p>
      )}
    </>
  );
};

export default TableWrapper;
