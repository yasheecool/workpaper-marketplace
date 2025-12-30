import {
  type RequestStatus,
  type ListingRow,
  type Listing,
} from '@/types/domain/listing';

export type ListingStatusesFromDb = {
  owned_by_firm: {
    id: string;
    name: string;
  };
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
    requested_by_firm_id: string;
    request_status: RequestStatus;
  }[];
};

export type MarketplaceListingFromDb = {
  id: string;
  name: string;
  description: string;
  content_type: string;
  updated_at: string;
  images_link: string[];
  visibility: string;
} & ListingStatusesFromDb;

type ListingStatuses = {
  isSaved: boolean;
  isInstalled: boolean;
  isRequested: boolean;
  requestStatus: RequestStatus | null;
  ownedByFirm: {
    id: string;
    name: string;
  };
};

export type MarketplaceListing = {
  id: string;
  name: string;
  description: string;
  contentType: string;
  updatedAt: string;
  imagesLink: string[];
  visibility: string;
  ownedByFirm: {
    id: string;
    name: string;
  };
} & ListingStatuses;

export const mapMarketplaceListingFromDb = (
  listing: MarketplaceListingFromDb
): MarketplaceListing => {
  return {
    id: listing.id,
    name: listing.name,
    description: listing.description,
    contentType: listing.content_type,
    updatedAt: listing.updated_at,
    imagesLink: listing.images_link,
    visibility: listing.visibility,
    ownedByFirm: {
      id: listing.owned_by_firm.id,
      name: listing.owned_by_firm.name,
    },
    isSaved:
      Array.isArray(listing.saved_listing) && listing.saved_listing.length > 0,
    isInstalled:
      Array.isArray(listing.installed_listing) &&
      listing.installed_listing.length > 0,
    isRequested:
      Array.isArray(listing.listing_access_control) &&
      listing.listing_access_control.length > 0,
    requestStatus: listing.listing_access_control?.[0]?.request_status || null,
  };
};

export const mapMarketplaceListingsFromDb = (
  listings: MarketplaceListingFromDb[]
): MarketplaceListing[] => {
  return listings.map(mapMarketplaceListingFromDb);
};

export type ListingWithStatuses = Listing & ListingStatuses;

export const mapListingFromDb = (
  listing: ListingRow & ListingStatusesFromDb
): ListingWithStatuses => {
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
    ownedByFirm: listing.owned_by_firm,
    isSaved:
      Array.isArray(listing.saved_listing) && listing.saved_listing.length > 0,
    isInstalled:
      Array.isArray(listing.installed_listing) &&
      listing.installed_listing.length > 0,
    isRequested:
      Array.isArray(listing.listing_access_control) &&
      listing.listing_access_control.length > 0,
    requestStatus: listing.listing_access_control?.[0]?.request_status || null,
  };
};

export const mapListingsFromDb = (
  listings: (ListingRow & ListingStatusesFromDb)[]
): ListingWithStatuses[] => {
  return listings.map((listing) => mapListingFromDb(listing));
};
