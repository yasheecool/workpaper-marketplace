'use client';
import { capitalize } from 'lodash';
import { type MarketplaceListing } from '../types';
import { formatDate } from '@/utils/formatDate';
import { toast } from 'react-toastify';
import Tooltip from '@/components/ui/Tooltip';
import Link from 'next/link';
import Image from 'next/image';
import { saveListing, installListing, requestListing } from '../actions';
import {
  getSavedButtonText,
  getInstallButtonText,
  isInstallButtonDisabled,
} from '../utils';
import { useTransition } from 'react';
// import { getButtonText } from '@/utils/ui-utils'

// TODO: split ListingCard into smaller components
const ListingCard = ({ listing }: { listing: MarketplaceListing }) => {
  // const { isSavingUnsaving, startSavingUnsaving } = useTransition();

  const {
    id,
    name,
    description,
    contentType,
    updatedAt,
    imagesLink,
    visibility,
    ownedByFirm: { name: firmName, id: vendorId },
    isSaved,
    isInstalled,
    isRequested,
    requestStatus,
  } = listing;

  const dataTip = {
    pending: 'The request is pending approval. Please check back later.',
    approved:
      'The request has been approved. You can proceed with the installation.',
    rejected:
      'The request has been rejected. Please contact the vendor support for more information.',
  };

  const saveButtonText = getSavedButtonText(isSaved);
  const installButtonText = getInstallButtonText(
    visibility,
    isRequested,
    requestStatus,
    isInstalled
  );
  const installButtonDisabled = isInstallButtonDisabled(
    visibility,
    isRequested,
    requestStatus,
    isInstalled
  );

  const handleInstallRequestListing = async () => {
    //logic for install or request listing
    toast.info('install or request listing feature coming soon!');
    await installListing(id);
    toast.info('Feature coming soon!');
  };

  const handleSaveListing = async () => {
    toast.info('Feature coming soon!');

    if (isSaved) {
      const res = await saveListing(id, 'unsave');
      console.log('Save Listing Response:', res);
    } else {
      const res = await saveListing(id, 'save');
      console.log('Save Listing Response:', res);
    }
  };

  return (
    <div className='grid grid-cols-[2fr_3fr_minmax(40px,220px)] gap-4 p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow ease-in-out bg-white'>
      {/* IMAGE */}
      <div className='relative rounded-md flex justify-center items-center border-[0.5px] border-gray-300'>
        {imagesLink.length ? (
          <Image
            src={'/undraw_approve.svg'}
            alt='listing image'
            fill
            className='object-contain border-[0.5px] border-gray-300 max'
            // style={{ width: '100%', height: 'auto' }}
          />
        ) : (
          <div className='text-sm justify-center items-center flex'>
            No Image Available
          </div>
        )}
      </div>

      {/* LISTING NAME, DESCRIPTION */}
      <div>
        <Link href={`/listing/${id}`}>
          <h2 className='font-semibold cursor-pointer hover:underline'>
            {name}{' '}
            <span className='badge badge-sm badge-primary'>
              {capitalize(contentType)}
            </span>
          </h2>
        </Link>

        <p className='text-xs mb-4 text-gray-600'>
          By{' '}
          <Link
            href={`/vendor-details/${vendorId}`}
            className='text-xs text-gray-600 hover:underline'
          >
            <span className='link link-hover font-semibold'>
              {firmName}
            </span>{' '}
          </Link>
        </p>

        <p className='text-sm text-gray-600'>
          {description.length > 100
            ? description.slice(0, 100) + '...'
            : description}
        </p>
      </div>

      {/* LISTING ACTIONS - Save, Request/Install */}
      <div className='flex flex-col items-center justify-between gap-2'>
        <div className='text-center text-gray-700'>
          <p className='font-bold'>FREE</p>
          <p className='text-xs'>Last updated: {formatDate(updatedAt)}</p>
        </div>

        <div className='w-full space-y-1'>
          {/* INSTALL LISTING BUTTON */}
          <div className='flex items-center justify-between gap-2 mb-2'>
            <button
              className='btn btn-primary w-9/10'
              onClick={handleInstallRequestListing}
              disabled={installButtonDisabled}
            >
              {installButtonText}
            </button>
            {isRequested && !isInstalled && (
              <div
                className='tooltip tooltip-left'
                data-tip={dataTip[requestStatus as keyof typeof dataTip]}
              >
                <Tooltip />
              </div>
            )}
          </div>

          {/* SAVED LISTING BUTTON */}
          <button
            className='btn w-9/10 bg-transparent text-primary border-primary hover:bg-base-300'
            onClick={async () => await handleSaveListing()}
          >
            {saveButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
