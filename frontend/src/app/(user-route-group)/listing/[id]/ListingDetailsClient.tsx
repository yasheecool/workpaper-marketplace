'use client';
import { useQuery } from '@tanstack/react-query';
import ImagePreview from '@/components/ImagePreview';
import { ListingWithStatuses } from '@/feature/listing/types';
import {
  ListingAlert,
  ListingHeader,
  ListingDescriptions,
} from './_components';
import { getListingById } from '@/feature/listing';

const ListingDetailsClient = ({
  listing: initialData,
  id,
}: {
  listing: ListingWithStatuses;
  id: string;
}) => {
  const {
    data: listing,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListingById(id),
    initialData,
  });

  const isRequestedMock = true;

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
    // isDeleted
  } = listing;

  const { id: vendorId, name: vendorName } = ownedByFirm;

  return (
    <>
      {' '}
      {/* ALERT MESSAGE */}
      {isInstalled || isRequested ? (
        <ListingAlert requestStatus={requestStatus} isInstalled={isInstalled} />
      ) : null}
      {/* LISTING HEADER - Name, Save/Install/Request Access Buttons */}
      <div className='flex flex-col gap-10 lg:col-start-2 '>
        <ListingHeader
          id={id}
          visibility={visibility}
          isRequested={isRequested}
          requestStatus={requestStatus}
          isInstalled={isInstalled}
          isSaved={isSaved}
          name={name}
          vendorName={vendorName}
          vendorId={vendorId}
          updatedAt={updatedAt}
          createdAt={createdAt}
        />
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
      <ListingDescriptions
        description={description}
        longDescription={longDescription}
        gettingStartedSteps={gettingStartedSteps}
        vendorId={vendorId}
        vendorName={vendorName}
      />
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
    </>
  );
};
export default ListingDetailsClient;
