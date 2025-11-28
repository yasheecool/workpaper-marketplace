'use client';
import { capitalize } from 'lodash';
import { ListingType } from '@/types/schema';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import {
  useListingStatuses,
  useListingActions,
} from '@/hooks/react-query/helperHooks';
import { toast } from 'react-toastify';
import Tooltip from './Tooltip';
import Link from 'next/link';
import { getButtonText } from '@/utils/ui-utils';

const ListingCard = ({ listing }: { listing: ListingType }) => {
  const {
    id,
    name,
    description,
    contentType,
    updatedAt,
    imagesLink,
    visibility,
    ownedByFirm: { firmName, firmId: vendorId },
  } = listing;

  const {
    installUninstallListing,
    isInstalling,
    saveUnsaveListing,
    requestListing,
  } = useListingActions();

  //this hook doesn't handle errors, hence we have to use optional chaining on request object
  const { isSaved, isInstalled, isRequested, request } = useListingStatuses(
    String(id)
  );

  const handleSaveListing = () => {
    saveUnsaveListing(
      {
        listingId: id,
        action: isSaved ? 'unsave' : 'save',
      },
      {
        onSuccess: (data) => toast.success(data.data.message),
      }
    );
  };

  const handleInstallRequestListing = () => {
    if (
      listing.visibility === 'public' ||
      request?.requestStatus === 'approved'
    )
      installUninstallListing(
        { listingId: String(id), action: 'install' },
        {
          onSuccess: (data) => {
            toast.success('Listing installed successfully');
          },
        }
      );
    else if (listing.visibility === 'request_access')
      requestListing(String(id), {
        onSuccess: (data) => {
          toast.success('Request sent successfully');
        },
      });
  };

  const buttonText = getButtonText(
    isInstalled,
    request?.requestStatus,
    visibility
  );

  const dataTip = {
    pending: 'The request is pending approval. Please check back later.',
    approved:
      'The request has been approved. You can proceed with the installation.',
    rejected:
      'The request has been rejected. Please contact the vendor support for more information.',
  };

  return (
    <div className='grid grid-cols-[2fr_3fr_minmax(40px,_220px)] gap-4 p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow ease-in-out bg-white'>
      {/* IMAGE */}
      <div className='relative rounded-md flex justify-center items-center border-[0.5px] border-gray-300'>
        {imagesLink.length ? (
          <img
            src={imagesLink[0]}
            alt='listing image'
            className='object-contain border-[0.5px] border-gray-300'
            style={{ width: '100%', height: 'auto' }}
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
            <span className='badge badge-sm bg-secondary-500 text-white'>
              {capitalize(contentType)}
            </span>
          </h2>
        </Link>

        <Link
          href={`/vendor-details/${vendorId}`}
          className='text-xs text-gray-600 hover:underline'
        >
          <p className='text-xs mb-4 text-gray-600'>
            By <span className='link link-hover font-semibold'>{firmName}</span>
          </p>
        </Link>

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
          <div className='flex items-center justify-between gap-2'>
            <button
              className='btn w-9/10 bg-secondary-500 text-white disabled:border-secondary-500 hover:bg-secondary-700  disabled:text-secondary-500 disabled:bg-transparent'
              onClick={handleInstallRequestListing}
              disabled={
                isInstalled ||
                (isRequested && request?.requestStatus !== 'approved') ||
                isInstalling
              }
            >
              {buttonText}
            </button>
            {isRequested && !isInstalled && (
              <div
                className='tooltip tooltip-left'
                data-tip={
                  dataTip[request.requestStatus as keyof typeof dataTip]
                }
              >
                <Tooltip />
              </div>
            )}
          </div>

          {/* SAVED LISTING BUTTON */}
          <button
            className='btn w-9/10 bg-transparent text-secondary-500 border-secondary-500 hover:bg-base-300'
            onClick={handleSaveListing}
          >
            {isSaved ? 'Unsave' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
