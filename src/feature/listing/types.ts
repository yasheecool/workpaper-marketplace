import {
  type ListingRow,
  type RequestStatus,
  type SavedListingRow,
  type Listing,
  type ListingContentRow,
  type ListingContent,
  ListingStatus,
} from '@/types/domain/listing';

export type FirmReference = {
  id: string;
  name: string;
};

export type ListingStatusesFromDb = {
  saved_listing: {
    id: string;
    saved_by_firm: string;
  }[];
  installed_listing: {
    id: string;
    installed_by_firm: string;
  }[];
  listing_access_control: {
    id: string;
    requested_by_firm: string;
    request_status: RequestStatus;
  }[];
};

export type ListingStatuses = {
  isSaved: boolean;
  isInstalled: boolean;
  isRequested: boolean;
  requestStatus: RequestStatus | null;
};

//MARKETPLACE LISTING TYPES + MAPPERS
export type MarketplaceListingFromDb = {
  id: string;
  name: string;
  description: string;
  content_type: string;
  updated_at: string;
  images_link: string[];
  visibility: string;
  owned_by_firm: FirmReference;
} & ListingStatusesFromDb;

export type MarketplaceListing = {
  id: string;
  name: string;
  description: string;
  contentType: string;
  updatedAt: string;
  imagesLink: string[];
  visibility: string;
  ownedByFirm: FirmReference;
} & ListingStatuses;

export function mapMarketplaceListingFromDb(
  listing: MarketplaceListingFromDb,
  currentFirmId: string
): MarketplaceListing {
  const isSaved =
    Array.isArray(listing.saved_listing) &&
    listing.saved_listing.some((save) => save.saved_by_firm === currentFirmId);

  const isInstalled =
    Array.isArray(listing.installed_listing) &&
    listing.installed_listing.some(
      (install) => install.installed_by_firm === currentFirmId
    );

  const isRequested =
    Array.isArray(listing.listing_access_control) &&
    listing.listing_access_control.some(
      (request) => request.requested_by_firm === currentFirmId
    );

  const requestStatus =
    listing.listing_access_control?.find(
      (request) => request.requested_by_firm === currentFirmId
    )?.request_status || null;

  return {
    id: listing.id,
    name: listing.name,
    description: listing.description,
    contentType: listing.content_type,
    updatedAt: listing.updated_at,
    imagesLink: listing.images_link,
    visibility: listing.visibility,
    ownedByFirm: listing.owned_by_firm,
    isSaved,
    isInstalled,
    isRequested,
    requestStatus,
  };
}

//FULL LISTING TYPES + MAPPERS
export type ListingFromDb = ListingRow &
  ListingStatusesFromDb & {
    owned_by_firm: FirmReference;
  };

export type ListingWithStatuses = Omit<Listing, 'ownedByFirm'> &
  ListingStatuses & {
    ownedByFirm: FirmReference;
  };

export function mapListingFromDb(
  listing: ListingFromDb,
  currentFirmId?: string
): ListingWithStatuses {
  const isSaved =
    Array.isArray(listing.saved_listing) &&
    listing.saved_listing.some((save) => save.saved_by_firm === currentFirmId);

  const isInstalled =
    Array.isArray(listing.installed_listing) &&
    listing.installed_listing.some(
      (install) => install.installed_by_firm === currentFirmId
    );

  const isRequested =
    Array.isArray(listing.listing_access_control) &&
    listing.listing_access_control.some(
      (request) => request.requested_by_firm === currentFirmId
    );

  const requestStatus =
    listing.listing_access_control?.find(
      (request) => request.requested_by_firm === currentFirmId
    )?.request_status || null;

  return {
    id: listing.id,
    createdAt: listing.created_at,
    updatedAt: listing.updated_at,
    name: listing.name,
    description: listing.description,
    longDescription: listing.long_description,
    gettingStartedSteps: listing.getting_started_steps,
    region: listing.region,
    contentType: listing.content_type,
    workpaperType: listing.workpaper_type,
    entityType: listing.entity_type,
    visibility: listing.visibility,
    status: listing.status,
    createdByUser: listing.created_by_user,
    updatedByUser: listing.updated_by_user,
    imagesLink: listing.images_link,
    ownedByFirm: {
      id: listing.owned_by_firm.id,
      name: listing.owned_by_firm.name,
    },
    isSaved,
    isInstalled,
    isRequested,
    requestStatus,
  };
}

//INSTALLED LISTING TYPES + MAPPER
export type InstalledListingFromDb = {
  id: string;
  created_at: string;
  installed_by_user: {
    last_name: string;
    first_name: string;
  };
  listing: {
    id: string;
    name: string;
    content_type: string;
    owned_by_firm: FirmReference;
    status: ListingStatus;
  };
};

export type InstalledListing = {
  id: string;
  createdAt: string;
  installedByUser: {
    lastName: string;
    firstName: string;
  };
  listing: {
    id: string;
    name: string;
    contentType: string;
    ownedByFirm: FirmReference;
    status: ListingStatus;
  };
};

export function mapInstalledListingsFromDb(
  installedListing: InstalledListingFromDb[]
): InstalledListing[] {
  return installedListing.map((item) => ({
    id: item.id,
    createdAt: item.created_at,
    installedByUser: {
      lastName: item.installed_by_user.last_name,
      firstName: item.installed_by_user.first_name,
    },
    listing: {
      id: item.listing.id,
      name: item.listing.name,
      contentType: item.listing.content_type,
      ownedByFirm: item.listing.owned_by_firm,
      status: item.listing.status,
    },
  }));
}

//REQUESTED LISTING TYPES + MAPPER
export type RequestedListingFromDb = Omit<
  InstalledListingFromDb,
  'installed_by_user'
> & {
  request_status: RequestStatus;
  requested_by_user: {
    last_name: string;
    first_name: string;
  };
};

export type RequestedListing = Omit<InstalledListing, 'installedByUser'> & {
  requestStatus: RequestStatus;
  requestedByUser: {
    lastName: string;
    firstName: string;
  };
};

export function mapRequestedListingsFromDb(
  listings: RequestedListingFromDb[]
): RequestedListing[] {
  return listings.map((listing) => ({
    id: listing.id,
    createdAt: listing.created_at,
    requestStatus: listing.request_status,
    requestedByUser: {
      firstName: listing.requested_by_user.first_name,
      lastName: listing.requested_by_user.last_name,
    },
    listing: {
      id: listing.listing.id,
      name: listing.listing.name,
      contentType: listing.listing.content_type,
      ownedByFirm: listing.listing.owned_by_firm,
      status: listing.listing.status,
    },
  }));
}

//SAVED LISTING TYPES + MAPPER
export type SavedListingFromDb = Omit<SavedListingRow, 'listing'> & {
  listing: {
    id: string;
    name: string;
    content_type: string;
    images_link: string[] | null;
    owned_by_firm: FirmReference;
  };
};

export type SavedListing = {
  id: string;
  listingId: string;
  savedByFirm: string;
  createdAt: string;
  listing: {
    id: string;
    name: string;
    contentType: string;
    imagesLink: string[] | null;
    ownedByFirm: FirmReference;
  };
};

export const mapSavedListingsFromDb = (
  savedListings: SavedListingFromDb[]
): SavedListing[] => {
  return savedListings.map((savedListing) => ({
    id: savedListing.id,
    listingId: savedListing.listing.id,
    savedByFirm: savedListing.saved_by_firm,
    createdAt: savedListing.created_at,
    listing: {
      id: savedListing.listing.id,
      name: savedListing.listing.name,
      contentType: savedListing.listing.content_type,
      imagesLink: savedListing.listing.images_link,
      ownedByFirm: savedListing.listing.owned_by_firm,
    },
  }));
};

export const mapListingContentFromDb = (
  listingContent: ListingContentRow
): ListingContent => {
  return {
    id: listingContent.id,
    createdAt: listingContent.created_at,
    name: listingContent.name,
    description: listingContent.description,
    contentType: listingContent.content_type,
    workpaperType: listingContent.workpaper_type,
    entityType: listingContent.entity_type,
    ownedByFirm: listingContent.owned_by_firm,
    region: listingContent.region,
  };
};

export * from '@/types/domain/listing';
