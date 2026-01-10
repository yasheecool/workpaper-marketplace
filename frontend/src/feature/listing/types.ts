import {
  type RequestStatus,
  type SavedListingRow,
} from '@/types/domain/listing';

export type FirmReference = {
  id: string;
  name: string;
};

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

export * from './types/listingStatuses';
export * from './types/marketplaceListingTypes';
export * from './types/listingWithStatuses';
export * from './types/mappers';
export * from '@/types/domain/listing';
