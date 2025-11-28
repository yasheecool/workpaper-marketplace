import {
  useFirmInstalledListings,
  useFirmRequestedListings,
} from '@/hooks/react-query/firm';

import { useUserSavedListings } from './user';

import {
  useUpdateFirmInstalledListings,
  useRequestListing,
  useUpdateUserSavedListings,
} from './listing';

//get statuses of a single listing - whether it is saved, installed, or requested. Also returns the install record and request record
export const useListingStatuses = (listingId: string) => {
  const { data: savedListings } = useUserSavedListings();
  const { data: installedListings } = useFirmInstalledListings();
  const { data: requestedListings } = useFirmRequestedListings();

  // TODO: add types to the listings
  const isSaved = savedListings?.some(
    (listing: any) => listing.listingId === listingId
  );

  const installedListing = installedListings?.find((listing: any) => {
    return listing.listingId === listingId;
  });

  const requestedListing = requestedListings?.find((listing: any) => {
    return listing.listingId === listingId;
  });

  return {
    isSaved,
    isInstalled: !!installedListing,
    installRecord: installedListing,
    isRequested: !!requestedListing,
    request: requestedListing,
  };
};

//wrapper to use all listing related mutations/actions through one hook, listingId and other params will still be passed to the mutation functions
export const useListingActions = () => {
  const { mutate: saveUnsaveListing } = useUpdateUserSavedListings();
  const { mutate: installUninstallListing, isPending: isInstalling } =
    useUpdateFirmInstalledListings();
  const { mutate: requestListing } = useRequestListing();

  return {
    saveUnsaveListing,
    installUninstallListing,
    isInstalling,
    requestListing,
  };
};
