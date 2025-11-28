'use client';
import { useParams } from 'next/navigation';
import { useListing } from '@/hooks/react-query/listing';
import { useVendorProfile } from '@/hooks/react-query/firm';
import {
  useListingStatuses,
  useListingActions,
} from '@/hooks/react-query/helperHooks';
import { formatDate } from '@/utils/formatDate';
import ImagePreview from '@/components/ImagePreview';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';
import { getButtonText } from '@/utils/ui-utils';

//this page's url contains the FULL listing id, which is then used to get the listing details
// TODO: Proper error handling for vendor profile
const ProductListing = () => {
  const { id } = useParams();

  const { listing, error, isLoading } = useListing(String(id));
  const {
    vendorProfile,
    error: vendorError,
    isLoading: isVendorLoading,
  } = useVendorProfile(listing?.ownerFirmId);

  const {
    installUninstallListing,
    isInstalling,
    saveUnsaveListing,
    requestListing,
  } = useListingActions();

  const { isSaved, isInstalled, installRecord, isRequested, request } =
    useListingStatuses(String(id));

  const isDeleted = listing?.status === 'deleted';

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

  const handleSaveListing = () => {
    saveUnsaveListing(
      {
        listingId: String(id),
        action: isSaved ? 'unsave' : 'save',
      },
      {
        onSuccess: (data) => toast.success(data.data.message),
      }
    );
  };

  const getAlertMessage = () => {
    if (isDeleted) {
      return 'This listing has been deleted by the vendor.';
    }
    if (isInstalled) {
      return `You installed this listing on ${formatDate(installRecord?.installTime)}.`;
    }
    if (request.requestStatus === 'pending') {
      return 'Your request is pending. Please wait for the vendor to approve your request.';
    }
    if (request.requestStatus === 'approved') {
      return `Your request was approved by the vendor on ${formatDate(request.actionTime)}.`;
    }
    if (request.requestStatus === 'rejected') {
      return `Your request was rejected by the vendor on ${formatDate(request.actionTime)}. Please contact the vendor for more information.`;
    }
  };

  if (isLoading || isVendorLoading) {
    return <Loading />;
  }

  if (error || vendorError) {
    return (
      <section className='py-8 text-gray-800'>
        <div className='section-container'>
          <h1 className='text-2xl font-semibold'>Error</h1>
          <p>{error?.message || vendorError?.message}</p>
        </div>
      </section>
    );
  }

  if (listing) {
    const { name, updatedAt, visibility, ownerFirmId, createdAt } = listing;

    return (
      <section className='py-8  text-gray-800'>
        <div
          className={`section-container grid gap-6 grid-rows-[auto_380px_1fr_auto] grid-cols-1 ${isInstalled || isRequested ? 'grid-rows-[auto_auto_380px_1fr_auto]' : ''} lg:grid-cols-[7fr_minmax(275px,3fr)] lg:grid-rows-[380px_auto] lg:items-start`}
        >
          {/* ALERT MESSAGE */}
          {isInstalled || isRequested ? (
            <div
              role='alert'
              className={`alert lg:col-span-2 row-end-1 flex flex-col gap-2 items-start`}
            >
              <div
                className={`flex items-center gap-2 ${isDeleted ? 'text-red-500' : 'text-secondary-600'}`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
                  />
                </svg>
                <p>{getAlertMessage()}</p>
              </div>
            </div>
          ) : null}

          {/* LISTING HEADER - Name, Save/Install/Request Access Buttons */}
          <div className='flex flex-col gap-10 lg:order-3 order-2'>
            <div className=' grid grid-cols-[1fr_auto] gap-4 rounded-md bg-gray-100 p-4'>
              <h1 className='text-2xl font-semibold'>{name}</h1>

              <div className='flex gap-2 items-center lg:order-1 lg:flex-col  lg:justify-center lg:items-stretch'>
                <button
                  className='btn text-secondary-500 bg-transparent rounded-3xl  border-secondary-500  hover:bg-white'
                  onClick={handleSaveListing}
                  disabled={isDeleted}
                >
                  {isSaved ? 'Unsave Listing' : 'Save'}
                </button>

                <button
                  className='btn bg-secondary-500 text-white hover:bg-secondary-700  disabled:text-secondary-500 disabled:border-secondary-500 disabled:bg-secondary-500 rounded-3xl'
                  onClick={handleInstallRequestListing}
                  disabled={
                    isInstalled ||
                    (isRequested && request?.requestStatus !== 'approved') ||
                    isDeleted ||
                    isInstalling
                  }
                >
                  {getButtonText(
                    isInstalled,
                    request?.requestStatus,
                    visibility
                  )}
                </button>
              </div>

              <div className='flex justify-between col-span-2 lg:flex-col'>
                <p className='text-xs text-gray-600 '>
                  By{' '}
                  <Link href={`/vendor-details/${ownerFirmId}`}>
                    <span className='link link-hover font-semibold'>
                      {vendorProfile?.vendor.firmName}
                    </span>
                  </Link>
                </p>

                <p className='text-xs '>
                  Last Updated: {formatDate(updatedAt)}
                </p>
                <p className='text-xs'>Date Created: {formatDate(createdAt)}</p>
              </div>
            </div>
          </div>

          {/* LISTING IMAGES */}
          <div className='order-3 overflow-hidden w-full relative h-full lg:order-2'>
            {listing.imagesLink.length ? (
              <ImagePreview
                imgUrls={listing?.imagesLink || []}
                setUrls={() => {}}
                showCloseButton={false}
              />
            ) : (
              <div className=''>No images available</div>
            )}
          </div>

          {/* LISTING DESCRIPTIONS */}
          <div className='rounded-md flex flex-col gap-8 order-4'>
            <div className='flex flex-col gap-6'>
              <div>
                <h2 className='text-xl font-semibold'>Short Description</h2>
                <p>{listing?.description}</p>
              </div>

              <div>
                <h2 className='text-xl font-semibold'>Long Description</h2>
                <p>{listing?.longDescription}</p>
              </div>

              <div>
                <h2 className='text-xl font-semibold'>Getting Started Steps</h2>
                <p>{listing?.gettingStartedSteps}</p>
              </div>
            </div>
            {/* Listing Support */}
            <div>
              <h2 className='text-xl font-semibold'>Listing Support</h2>
              <p>Support Email: {vendorProfile?.firmEmail}</p>

              <p>
                Vendor Information:{' '}
                <Link href={`/vendor-details/${listing?.ownerFirmId}`}>
                  <span className='link link-hover font-semibold'>
                    {vendorProfile?.vendor.firmName}
                  </span>
                </Link>
              </p>
            </div>
          </div>

          {/* ADDITIONAL DETAILS */}
          <div className='bg-gray-50 p-4 order-5'>
            <h2 className='text-xl font-semibold mb-4'>Additional Details</h2>
            <div className='flex flex-col gap-2 text-sm'>
              <p>
                Listing type:{' '}
                <span className='badge badge-primary opacity-80 text-white'>
                  {listing?.contentType}
                </span>
              </p>

              <p>Applicable for: {listing?.entityType.join(', ')}</p>
              <p>Workpaper Type: {listing?.workpaperType.join(', ')}</p>
              <p>Tags: {listing?.tags.join(', ')}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default ProductListing;
