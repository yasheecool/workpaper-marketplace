import { type ListingRow } from '@/types/domain/listing';
import {
  type MarketplaceListingFromDbWithStatuses,
  type MarketplaceListing,
} from './marketplaceListingTypes';
import { FirmReference } from '../types';
import {
  type ListingStatusesFromDb,
  type ListingStatuses,
  type ListingFromDbWithStatuses,
} from './listingStatuses';
import { type ListingWithStatuses } from './listingWithStatuses';

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
