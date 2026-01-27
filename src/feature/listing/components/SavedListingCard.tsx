'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSaveListingMutation } from '@/feature/listing/hooks/useListingMutations';
import { toast } from 'react-toastify';
import capitalize from 'lodash/capitalize';
import { useEffect, useState } from 'react';
import { getImageUrl } from '@/lib/supabase/storage';

type ListingForCard = {
  name: string;
  id: string;
  contentType: string;
  description: string;
  ownedByFirm: {
    id: string;
    name: string;
  };
  imagesLink: string[] | null;
};

const SavedListingCard = ({
  listing,
  showUnsaveButton,
}: {
  listing: ListingForCard;
  showUnsaveButton: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {
    name,
    id,
    contentType,
    description,
    ownedByFirm: { id: firmId, name: firmName },
    imagesLink,
  } = listing;

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (imagesLink && imagesLink.length > 0) {
        const url = await getImageUrl(imagesLink[0], 'LISTING_IMAGES_BUCKET');
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [listing]);

  const { mutate: saveListing, isPending: isSaving } =
    useSaveListingMutation(id);

  const handleUnsave = async () => {
    await saveListing('unsave', {
      onSuccess: (_, variables) => {
        toast.success(`Listing ${variables}d successfully!`);
      },
    });
  };

  return (
    <div className='rounded-md flex flex-col gap-2 shadow-md hover:shadow-lg min-w-62.5 w-80 border border-gray-200 bg-white min-h-75'>
      {/* IMAGE */}
      <div className='relative min-h-37.5 w-full border-b-[0.25]'>
        <Image
          src={
            imageUrl ||
            '/undraw_approve.svg' /* Placeholder image if none exists */
          }
          fill
          className='object-cover'
          alt='listing image'
        />
      </div>

      {/* DETAILS */}
      <div className='px-4 flex flex-col'>
        {/* Name, Vendor Name */}
        <h2 className='text-base font-semibold leading-tight mb-1'>{name}</h2>

        <p className='text-xs text-gray-600 '>
          <span className='badge badge-primary badge-sm opacity-85'>
            {capitalize(contentType)}
          </span>{' '}
          By{' '}
          <Link href={`/vendor-details/${firmId}`}>
            <span className='link link-hover font-semibold text-gray-700'>
              {firmName}
            </span>
          </Link>
        </p>
      </div>

      <div className='px-4 text-sm text-gray-700'>
        {description.slice(0, 80).concat('...')}
      </div>

      {/* Unsave and View Buttons */}
      <div className='flex gap-2 justify-end px-4 pb-4 mt-auto'>
        {showUnsaveButton && (
          <button
            className='btn btn-sm bg-transparent border-secondary-500 hover:bg-base-300 text-secondary-500'
            disabled={isSaving}
            onClick={handleUnsave}
          >
            {isSaving ? (
              <>
                <span className='loading loading-sm'></span> <p>Unsaving</p>
              </>
            ) : (
              'Unsave'
            )}
          </button>
        )}

        <Link href={`/listing/${id}`}>
          <button className='btn btn-sm btn-primary'>View</button>
        </Link>
      </div>
    </div>
  );
};

export default SavedListingCard;
