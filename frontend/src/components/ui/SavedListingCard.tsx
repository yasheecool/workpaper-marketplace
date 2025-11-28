'use client';
import Image from 'next/image';
import { ListingType } from '@/types/schema';
import { useUpdateUserSavedListings } from '@/hooks/react-query/listing';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Tooltip from '@/components/ui/Tooltip';

const SavedListingCard = ({ listing }: { listing: ListingType }) => {
  const { mutate: updateSavedListings } = useUpdateUserSavedListings();
  const {
    id,
    imagesLink,
    name,
    ownedByFirm: { firmId, firmName },
    status,
  } = listing;
  const isDeleted = status === 'deleted';

  const handleUnsave = () => {
    updateSavedListings(
      { listingId: id, action: 'unsave' },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div className='rounded-md flex flex-col gap-4 shadow-sm  hover:shadow-md min-w-[250px] w-[350px] border border-gray-200 bg-white max-h-[380px]'>
      {/* IMAGE */}
      <div className='relative h-[300px] w-full border-b-[0.25]'>
        <Image
          src={imagesLink?.[0] || '/undraw_approve.svg'}
          fill
          className='object-cover'
          alt='listing image'
        />
      </div>

      {/* DETAILS */}
      <div className='px-4 pb-4 flex flex-col gap-2'>
        {/* Name, Vendor Name */}
        <div className={`${isDeleted ? 'opacity-50' : ''}`}>
          <h2 className='text-base font-semibold leading-tight mb-1'>{name}</h2>
          {}
          <p className='text-xs text-gray-600 '>
            By{' '}
            <Link href={`/vendor-details/${firmId}`}>
              <span className='link link-hover font-semibold text-gray-700'>
                {firmName}
              </span>
            </Link>
          </p>
          {isDeleted && (
            <div className='flex'>
              <div
                className={`tooltip tooltip-right tooltip-secondary flex items-center ${
                  isDeleted ? 'text-red-500' : 'text-secondary-600'
                }`}
                data-tip='This listing has been deleted'
              >
                <Tooltip />
                <p className='text-xs'>DELETED</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Type, Price */}
        <div className='flex justify-between items-center gap-4'>
          <p className='text-xs text-gray-600 '>
            Type:{' '}
            <span className='badge badge-primary badge-sm opacity-75'>
              Checklist
            </span>
          </p>
          <p className='font-semibold text-gray-700'>FREE</p>
        </div>

        {/* Unsave and View Buttons */}
        <div className='flex gap-2 justify-end'>
          <button
            className='btn btn-sm bg-transparent border-secondary-500 hover:bg-base-300 text-secondary-500'
            onClick={handleUnsave}
          >
            Unsave
          </button>
          <Link href={`/listing/${id}`}>
            <button className='btn btn-sm bg-secondary-500 text-white hover:bg-secondary-700'>
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SavedListingCard;
