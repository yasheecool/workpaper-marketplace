'use client';

import { TableHeaderRow } from '@/components/ui';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ListingType } from '@/types/schema';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import Ellipsis from '@/components/ui/Ellipsis';

const tableHeadings = [
  'Select',
  'Listing Name',
  'Type',
  'Updated',
  'Last Updated By',
  'Access Type',
  'Status',
  'Actions',
];

const TableWrapper = (
  {
    // filteredListings,
  }: {
    // filteredListings: Partial<ListingType>[];
  }
) => {
  const router = useRouter();

  const navigateToEditor = (id: string) => {
    router.push(`/vendor/listing/edit/${id}`);
  };

  const restoreDeleteListing = (id: string, isDeleted: boolean) => {
    const newStatus = isDeleted ? 'active' : 'deleted';
    // updateListing(
    //   {
    //     listingId: id,
    //     updatedFields: { status: newStatus },
    //   },
    //   {
    //     onSuccess: () => {
    //       toast.success(
    //         `Listing ${isDeleted ? 'restored' : 'deleted'} successfully!`
    //       );
    //     },
    //   }
    // );
  };

  return (
    <table className='table'>
      <thead className='bg-base-200 text-gray-600 '>
        <TableHeaderRow headings={tableHeadings} />
      </thead>

      <tbody>
        {/* {filteredListings.map((listing: Partial<ListingType>, idx: number) => {
          const {
            name,
            id,
            contentType,
            updatedAt,
            updatedBy,
            visibility,
            status,
          } = listing;

          const isDeleted = status === 'deleted';

          return (
            <tr className='hover:bg-base-200 h-[50px]' key={idx}>
              <td>
                <div className='w-full flex items-center justify-center'>
                  <input
                    type='checkbox'
                    // checked={selectedListings.includes(id!)}
                    className='checkbox checkbox-sm'
                    // onChange={() => selectListing(id!)}
                  />
                </div>
              </td>
              <td
                className='link link-hover font-semibold'
                onClick={() => navigateToEditor(listing.id!)}
              >
                {name}
              </td>
              <td className='text-gray-600'>{capitalize(contentType)}</td>
              <td className='text-gray-600'>{formatDate(updatedAt!)}</td>
              <td className='text-gray-600'>
                {updatedBy?.firstName} {updatedBy?.lastName}
              </td>
              <td className='text-gray-600'>
                {capitalize(visibility?.split('_').join(' '))}
              </td>
              <td className='text-gray-600'>
                {status === 'active' ? (
                  <span className='badge badge-success'>Active</span>
                ) : (
                  <span className='badge badge-error'>Deleted</span>
                )}
              </td>
              <td className='text-gray-600'>
                <Ellipsis
                  actions={[
                    {
                      label: 'Edit',
                      action: () => navigateToEditor(listing.id!), // clicking a listing will navigate to the editor
                    },
                    {
                      label: `${isDeleted ? 'Restore' : 'Delete'}`,
                      action: () =>
                        restoreDeleteListing(listing.id!, isDeleted),
                      className: 'text-red-500',
                    },
                  ]}
                />
              </td>
            </tr>
          );
        })} */}
      </tbody>
    </table>
  );
};

export default TableWrapper;
