'use client';
import {
  ListingAlert,
  ListingHeader,
  ListingDescriptions,
} from './_components';
import {
  useListingById,
  ListingWithStatuses,
  ListingWithoutStatuses,
} from '@/feature/listing';
import { Loading, ImagePreview } from '@/components/ui';
import { useEffect, useState } from 'react';
import { getImageUrl } from '@/lib/supabase/storage';

const isListingWithStatuses = (
  listing: ListingWithStatuses | ListingWithoutStatuses,
): listing is ListingWithStatuses => {
  return (listing as ListingWithStatuses).isInstalled !== undefined;
};

const ListingDetailsClient = ({
  listing: initialData,
  id,
}: {
  listing: ListingWithStatuses | ListingWithoutStatuses;
  id: string;
}) => {
  const { data: listing, isLoading, error } = useListingById(id, initialData);
  const [listingImages, setListingImages] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (listing?.imagesLink && listing.imagesLink.length > 0) {
        const urls = await Promise.all(
          listing.imagesLink.map((path) =>
            getImageUrl(path, 'LISTING_IMAGES_BUCKET'),
          ),
        );
        setListingImages(urls as string[]);
      }
    };
    fetchImages();
  }, [listing?.imagesLink]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !listing) {
    return <p>Error loading listing: {String(error?.message)}</p>;
  }

  const {
    name,
    updatedAt,
    visibility,
    createdAt,
    ownedByFirm,
    description,
    longDescription,
    gettingStartedSteps,
    workpaperType,
    entityType,
    contentType,
    status,
  } = listing;

  let isInstalled, isRequested, isSaved, requestStatus;

  //if listing does not have statuses, set default values - this happens when user is not logged in but actions are protected with necessary checks
  if (!isListingWithStatuses(listing)) {
    isInstalled = false;
    isRequested = false;
    isSaved = false;
    requestStatus = null;
  } else {
    isInstalled = listing.isInstalled;
    isRequested = listing.isRequested;
    isSaved = listing.isSaved;
    requestStatus = listing.requestStatus;
  }

  const { id: vendorId, name: vendorName } = ownedByFirm;

  return (
    <>
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
        className={`overflow-hidden w-full relative h-96 ${isRequested || isInstalled ? 'lg:row-start-2' : 'lg:row-start-1 '}`}
      >
        <ImagePreview
          imgUrls={
            listingImages && listingImages.length > 0
              ? listingImages
              : ['/undraw_files.svg']
          }
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
