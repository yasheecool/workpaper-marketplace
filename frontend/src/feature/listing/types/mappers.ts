import { type ListingRow } from '@/types/domain/listing';
import {
  type MarketplaceListingFromDbWithStatuses,
  type MarketplaceListing,
} from './marketplaceListingTypes';
import {
  type ListingStatusesFromDb,
  type ListingStatuses,
  type FirmReference,
  type ListingFromDbWithStatuses,
} from './listingStatuses';
import { type SavedListingFromDb, SavedListing } from './savedListingTypes';
import { type ListingWithStatuses } from './listingWithStatuses';
import {
  type InstalledListingFromDb,
  InstalledListing,
} from './installedListing';
import {
  type RequestedListingFromDb,
  RequestedListing,
} from './requestedListing';

export function mapMarketplaceListingFromDb<T extends MarketplaceListing>(
  listing: MarketplaceListingFromDbWithStatuses
): MarketplaceListing {
  return {
    id: listing.id,
    name: listing.name,
    description: listing.description,
    contentType: listing.content_type,
    updatedAt: listing.updated_at,
    imagesLink: listing.images_link,
    visibility: listing.visibility,
    ownedByFirm: listing.owned_by_firm,
    isSaved: listing.isSaved,
    isInstalled: listing.isInstalled,
    isRequested: listing.isRequested,
    requestStatus: listing.requestStatus,
  };
}

export function mapMarketplaceListingsFromDb(
  listings: MarketplaceListingFromDbWithStatuses[]
): MarketplaceListing[] {
  return listings.map(mapMarketplaceListingFromDb);
}

export function mapListingFromDb(
  listing: ListingFromDbWithStatuses
): ListingWithStatuses {
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
    isSaved: listing.isSaved,
    isInstalled: listing.isInstalled,
    isRequested: listing.isRequested,
    requestStatus: listing.requestStatus,
  };
}

export const mapListingsFromDb = (
  listings: (ListingRow &
    ListingStatusesFromDb &
    ListingStatuses & {
      owned_by_firm: FirmReference;
    })[]
): ListingWithStatuses[] => {
  return listings.map(mapListingFromDb);
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
