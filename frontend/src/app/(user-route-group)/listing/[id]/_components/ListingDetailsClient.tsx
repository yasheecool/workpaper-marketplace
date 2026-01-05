'use client';

import { formatDate } from '@/utils/formatDate';
import ImagePreview from '@/components/ImagePreview';
import Container from '@/components/layout/Container';
import Link from 'next/link';
import {
  getSavedButtonText,
  getInstallButtonText,
  isInstallButtonDisabled,
  type ListingWithStatuses,
} from '@/feature/listing';
import { capitalize } from 'lodash';
import {
  useSaveListingMutation,
  useInstallListingMutation,
  useRequestListingMutation,
} from '@/feature/listing/hooks/useListingMutations';
import ListingAlertMessage from './ListingAlertMessage';
import ListingHeader from './ListingHeader';
import ListingDescriptions from './ListingDescriptions';
import ListingAdditionalDetails from './ListingAdditionalDetails';

interface ListingDetailsClientProps {
  listing: ListingWithStatuses;
}

const ListingDetailsClient = ({ listing }: ListingDetailsClientProps) => {
  const {
    id,
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
  } = listing;

  const { mutate: saveListingMutation, isPending: isSavePending } =
    useSaveListingMutation(id);
  const { mutate: installListingMutation, isPending: isInstallPending } =
    useInstallListingMutation(id);
  const { mutate: requestListingMutation, isPending: isRequestPending } =
    useRequestListingMutation(id);

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

  const handleSaveListing = () => {
    saveListingMutation(saveButtonText);
  };

  const handleInstallRequest = () => {
    if (installButtonText === 'Install') {
      installListingMutation();
    } else if (installButtonText === 'Request') {
      requestListingMutation();
    }
  };

  return (
    <section className='py-8 text-base-content'>
      <Container styles='grid gap-6 grid-rows-[auto_auto_1fr_auto] grid-cols-1 lg:grid-cols-[7fr_minmax(70,3fr)] items-start'>
        <ListingAlertMessage
          isRequested={isRequested}
          isInstalled={isInstalled}
          requestStatus={requestStatus}
        />

        <ListingHeader
          name={name}
          vendorId={ownedByFirm.id}
          vendorName={ownedByFirm.name}
          updatedAt={updatedAt}
          createdAt={createdAt}
          saveButtonText={saveButtonText}
          installButtonText={installButtonText}
          installButtonDisabled={installButtonDisabled}
          onSave={handleSaveListing}
          onInstallRequest={handleInstallRequest}
          isSavePending={isSavePending}
          isInstallPending={isInstallPending}
          isRequestPending={isRequestPending}
          isRequested={isRequested}
        />

        <div
          className={`overflow-hidden w-full relative h-96 ${isRequested ? 'lg:row-start-2' : 'lg:row-start-1'}`}
        >
          <ImagePreview imgUrls={imagesLink || []} showCloseButton={false} />
        </div>

        <ListingDescriptions
          description={description}
          longDescription={longDescription}
          gettingStartedSteps={gettingStartedSteps}
          vendorId={ownedByFirm.id}
          vendorName={ownedByFirm.name}
        />

        <ListingAdditionalDetails
          contentType={contentType}
          entityType={entityType}
          workpaperType={workpaperType}
        />
      </Container>
    </section>
  );
};

export default ListingDetailsClient;
