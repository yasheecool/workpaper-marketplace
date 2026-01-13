'use client';

import { TableHeaderRow, Loading } from '@/components/ui';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { VendorListing } from '@/feature/vendor/types';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from 'lodash';
import Ellipsis from '@/components/ui/Ellipsis';
import { getVendorListings } from '@/feature/vendor';
import Link from 'next/link';

const tableHeadings = [
  'No.',
  'Listing Name',
  'Type',
  'Updated',
  'Last Updated By',
  'Access Type',
  'Status',
  'Actions',
];

type Filters = {
  listingType: string;
  visibility: string;
  sortBy: string;
  searchQuery: string;
};

const TableWrapper = ({
  initialData,
  filters,
}: {
  initialData: VendorListing[];
  filters: Filters;
}) => {
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ['vendor-listings', filters],
    queryFn: () => getVendorListings(filters),
    initialData,
  });

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className='p-4'>Error loading listings. Please try again later.</div>
    );
  }

  return (
    <table className='table'>
      <thead className='bg-base-200 text-gray-600 '>
        <TableHeaderRow headings={tableHeadings} />
      </thead>

      <tbody>
        {data.map((listing, idx: number) => {
          const {
            name,
            id,
            contentType,
            updatedAt,
            updatedByUser,
            visibility,
            status,
          } = listing;

          const isDeleted = status === 'deleted';

          return (
            <tr className='hover:bg-base-200 h-12.5' key={idx}>
              <td>{idx + 1}</td>
              <td>
                <Link
                  href={`/vendor/listing/edit/${id}`}
                  className='link link-hover font-semibold'
                >
                  {name}
                </Link>
              </td>
              <td className='text-gray-600'>{capitalize(contentType)}</td>
              <td className='text-gray-600'>{formatDate(updatedAt!)}</td>
              <td className='text-gray-600'>
                {updatedByUser.firstName} {updatedByUser.lastName}
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
                      action: () => navigateToEditor(listing.id!),
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
        })}
      </tbody>
    </table>
  );
};

export default TableWrapper;
