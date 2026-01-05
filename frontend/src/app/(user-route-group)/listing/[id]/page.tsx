// 'use client';
import { formatDate } from '@/utils/formatDate';
import ImagePreview from '@/components/ImagePreview';
import Container from '@/components/layout/Container';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';
import { getListingById } from '@/feature/listing';
import { getButtonText } from '@/utils/ui-utils';
import {
  isInstallButtonDisabled,
  getSavedButtonText,
  getInstallButtonText,
} from '@/feature/listing';
import { capitalize } from 'lodash';
// import { useQuery } from '@tanstack/react-query';

const ListingDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data: listing } = await getListingById(String(id));
  // const {
  //   data: listing,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ['listing', id],
  //   queryFn: () => getListingById(String(id)),
  // });

  if (!listing) {
    return (
      <div className='min-h-[calc(100vh-70px)] flex items-center justify-center'>
        <p className='text-red-500'>Error loading listing</p>
      </div>
    );
  }

  const {
    name,
    updatedAt,
    visibility,
    isInstalled,
    isRequested,
    createdAt,
    ownedByFirm,
    isSaved,
    description,
    longDescription,
    gettingStartedSteps,
    requestStatus,
    imagesLink,
    workpaperType,
    entityType,
    contentType,
    region,
    status,
  } = listing;

  const { id: vendorId, name: vendorName } = ownedByFirm;

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

  const isRequestedMock = true;

  return (
    <section className='py-8 text-base-content'>
      {/* was isInstalled and isRequested */}
      <Container
        styles={`grid gap-6 grid-rows-[auto_auto_1fr_auto] grid-cols-1 lg:grid-cols-[7fr_minmax(70,3fr)] items-start`}
      >
        {/* ALERT MESSAGE */}
        {isRequestedMock || isRequested ? (
          <div role='alert' className={`alert lg:col-span-2`}>
            <div
              className={`flex items-center gap-2 ${true ? 'text-red-500' : 'text-primary'}`}
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
              <p>Alert message for requested, installed, deleted etc.</p>
            </div>
          </div>
        ) : null}

        {/* LISTING HEADER - Name, Save/Install/Request Access Buttons */}
        <div className='flex flex-col gap-10 lg:col-start-2 '>
          <div className='grid grid-cols-[1fr_auto] gap-4 rounded-md bg-base-300 p-4'>
            <h1 className='text-2xl font-semibold'>{name}</h1>

            <div className='flex gap-2 items-center lg:order-1 lg:flex-col  lg:justify-center lg:items-stretch'>
              <button
                className='btn text-primary bg-transparent rounded-3xl  border-primary  hover:bg-white'
                // onClick={handleSaveListing}
                // disabled={isDeleted}
              >
                {capitalize(saveButtonText)}
              </button>
              {/* TODO: add disabled styles for this button */}
              <button
                className='btn btn-primary disabled:text-primary disabled:border-primary rounded-3xl disabled:bg-transparent'
                // onClick={handleInstallRequestListing}
                disabled={installButtonDisabled}
              >
                {installButtonText}
              </button>
            </div>

            <div className='flex justify-between col-span-2 lg:flex-col'>
              <p className='text-xs text-gray-600 '>
                By{' '}
                <Link href={`/vendor-details/${vendorId}`}>
                  <span className='link link-hover font-semibold'>
                    {vendorName}
                  </span>
                </Link>
              </p>

              <p className='text-xs '>Last Updated: {formatDate(updatedAt)}</p>
              <p className='text-xs'>Date Created: {formatDate(createdAt)}</p>
            </div>
          </div>
        </div>

        {/* LISTING IMAGES */}
        <div
          className={`overflow-hidden w-full relative h-96 ${isRequestedMock ? 'lg:row-start-2' : 'lg:row-start-1 '}`}
        >
          <ImagePreview
            imgUrls={[]}
            // setUrls={}
            showCloseButton={false}
          />
        </div>

        {/* LISTING DESCRIPTIONS */}
        <div className='rounded-md flex flex-col gap-8'>
          <div className='flex flex-col gap-6'>
            <div>
              <h2 className='text-xl font-semibold'>Short Description</h2>
              <p>{description}</p>
            </div>

            <div>
              <h2 className='text-xl font-semibold'>Long Description</h2>
              <p>{longDescription}</p>
            </div>

            <div>
              <h2 className='text-xl font-semibold'>Getting Started Steps</h2>
              <p>{gettingStartedSteps}</p>
            </div>
          </div>

          {/* Listing Support */}
          <div>
            <h2 className='text-xl font-semibold'>Listing Support</h2>
            <p>Support Email: Support Email</p>

            <p>
              Vendor Information:{' '}
              <Link href={`/vendor-details/${vendorId}`}>
                <span className='link link-hover font-semibold'>
                  {vendorName}
                </span>
              </Link>
            </p>
          </div>
        </div>

        {/* ADDITIONAL DETAILS */}
        <div className='bg-base-300 p-4 rounded-md'>
          <h2 className='text-xl font-semibold mb-4'>Additional Details</h2>
          <div className='flex flex-col gap-2 text-sm'>
            <p>
              Listing type:{' '}
              <span className='badge badge-primary'>{contentType}</span>
            </p>

            <p>Applicable for: {entityType.join(', ')}</p>
            <p>Workpaper Type: {workpaperType.join(', ')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ListingDetailsPage;
