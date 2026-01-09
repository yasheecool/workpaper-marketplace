'use client';

import { TableHeaderRow } from '@/components/ui/TableRows';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import { toast } from 'react-toastify';
import Ellipsis from '@/components/ui/Ellipsis';
import Tooltip from '@/components/ui/Tooltip';
import Link from 'next/link';
import { getStatusClass } from '@/utils/ui-utils';
import { useQuery } from '@tanstack/react-query';
import { ListingType } from '@/types/domain/listing';
import { getInstalledListings, getRequestedListings } from '@/feature/listing';
import { InstalledListing, RequestedListing } from '@/feature/listing/types';

type ResponseType = InstalledListing[] | RequestedListing[];

const TableWrapper = ({
  filters,
}: {
  filters: {
    status: 'installed' | 'requested';
    // contentType: ListingType | 'all';
  };
}) => {
  const { status } = filters;

  const queryFn =
    status === 'installed' ? getInstalledListings : getRequestedListings;

  const { data, isError, isLoading } = useQuery<ResponseType>({
    queryKey: [`${status}-listings`],
    queryFn: queryFn,
  });

  console.log(data);

  const handleUninstall = (listingId: string) => {
    // installUninstallListing(
    //   { listingId, action: 'uninstall' },
    //   {
    //     onSuccess: () => {
    //       toast.success('Listing uninstalled successfully!');
    //     },
    //     onError: () => {
    //       toast.error('Failed to uninstall listing.');
    //     },
    //   }
    // );
  };

  const headings = [
    'No.',
    'Name',
    'Vendor Name',
    'Type',
    ...(status === 'installed'
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

  if (isLoading) {
    return <p className='p-4'>Loading...</p>;
  }

  if (isError || data === undefined) {
    return (
      <p className='p-4'>Error loading listings. Please try again later.</p>
    );
  }

  return (
    <>
      <table className='table border-[0.5px] border-gray-200 rounded-md'>
        <thead className='bg-base-200 '>
          <TableHeaderRow headings={headings} />
        </thead>

        <tbody>
          {data.map((record, idx: number) => {
            const {
              createdAt,
              listing: { name, ownedByFirm, contentType, id: listingId },
            } = record;

            const isRequested = 'requestStatus' in record;

            return (
              <tr
                key={idx}
                // className={`${status === 'deleted' ? 'opacity-75' : ''}`}
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
                    {/* {status === 'deleted' && (
                      <div
                        className='tooltip tooltip-top z-10'
                        data-tip={dataTip.deleted}
                      >
                        <span className='text-red-500 text-sm ml-2 flex items-center gap-1'>
                          <Tooltip />
                          (unavailable)
                        </span>
                      </div>
                    )} */}
                  </div>
                </td>
                <td>
                  <Link href={`/vendor-details/${ownedByFirm.id}`}>
                    <span className='link link-hover'>{ownedByFirm.name}</span>
                  </Link>
                </td>
                <td>{capitalize(contentType)}</td>

                {!isRequested && (
                  <>
                    <td>{formatDate(createdAt)}</td>
                    <td>
                      {record.installedByUser.firstName}{' '}
                      {record.installedByUser.lastName}
                    </td>
                    <td className='text-gray-600'>
                      <div className='flex items-center justify-start'>
                        <Ellipsis
                          actions={[
                            {
                              label: 'Uninstall',
                              className: 'text-red-500',
                              action: () => handleUninstall(listingId),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </>
                )}

                {isRequested && (
                  <>
                    <td>{formatDate(createdAt)}</td>
                    <td>
                      {record.requestedByUser.firstName}{' '}
                      {record.requestedByUser.lastName}
                    </td>

                    <td className='text-gray-600'>
                      <div className='flex items-center gap-2'>
                        <span
                          aria-label='status'
                          className={`status ${getStatusClass(record.requestStatus)}`}
                        ></span>
                        {capitalize(record.requestStatus)}
                      </div>
                    </td>
                    <td>
                      <div
                        className='tooltip tooltip-left'
                        data-tip={
                          dataTip[record.requestStatus as keyof typeof dataTip]
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
    </>
  );
};

export default TableWrapper;
