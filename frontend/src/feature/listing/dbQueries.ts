'use server';

import { createClient } from '@/lib/supabase/serverClient';
import {
  type MarketplaceListingFromDb,
  mapMarketplaceListingsFromDb,
  mapListingFromDb,
  ListingFromDb,
  ListingStatuses,
} from './types';
import { type ListingRow } from '@/types/domain/listing';
import { getFirmsContext } from '@/feature/firm';

// type ListingWithStatusesFromDb = ListingRow &
//   ListingStatusesFromDb & {
//     owned_by_firm: FirmReference;
//   };

const SELECT_FIELDS = `
  id,
  name, 
  description, 
  content_type, 
  updated_at, 
  images_link,
  visibility,
  owned_by_firm:firm!listing_owned_by_firm_fkey(id, name),
  saved_listing(id, saved_by_firm),
  installed_listing(id, installed_by_firm),
  listing_access_control(id, requested_by_firm, request_status)
`;

export const getMarketplaceListings = async (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();

  const { search, page } = params;
  const contentType = params['content-type'];
  const workpaperType = params['workpaper-type'];
  const entityType = params['entity-type'];
  const PER_PAGE = 10;
  const pageNum = Number(page) || 1;

  const query = supabase
    .from('listing')
    .select(SELECT_FIELDS, {
      count: 'estimated',
    })
    .range((pageNum - 1) * PER_PAGE, pageNum * PER_PAGE - 1);

  if (search && typeof search === 'string' && search.trim().length > 0) {
    query.textSearch('name', search.trim(), {
      type: 'plain',
    });
  }

  if (contentType) {
    const values = Array.isArray(contentType) ? contentType : [contentType];
    query.in('content_type', values);
  }

  if (workpaperType) {
    const values = Array.isArray(workpaperType)
      ? workpaperType
      : [workpaperType];

    query.overlaps('workpaper_type', values);
  }

  if (entityType) {
    const values = Array.isArray(entityType) ? entityType : [entityType];

    query.overlaps('entity_type', values);
  }

  const { data: listingsFromDb, error, count } = await query;

  if (error) {
    console.error('Error fetching listings:', error);

    throw new Error(
      error.message || 'An error occurred while fetching listings.'
    );
  }
  const listingsWithStatus = listingsFromDb!!.map((listing) =>
    listingWithDerivedStatuses(
      listing as unknown as MarketplaceListingFromDb,
      currentFirm!!.id
    )
  );

  const totalPages = count ? Math.ceil(count / PER_PAGE) : 0;

  const data = mapMarketplaceListingsFromDb(listingsWithStatus);

  return {
    data,
    count,
    totalPages,
    currentPage: pageNum,
  };
};

export const getListingById = async (listingId: string) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();
  const currentFirmId = currentFirm!!.id;

  const { data: listingFromDb, error } = await supabase
    .from('listing')
    .select(
      `*, 
      owned_by_firm:firm!listing_owned_by_firm_fkey(id, name),
      saved_listing(id, saved_by_firm),
      installed_listing(id, installed_by_firm),
      listing_access_control(id, requested_by_firm, request_status)`
    )
    .eq('id', listingId)
    .single();

  if (error) {
    throw new Error(
      error.message || 'An error occurred while fetching the listing.'
    );
  }

  const listingWithStatuses = listingWithDerivedStatuses(
    listingFromDb as ListingFromDb,
    currentFirmId
  );
  const listing = mapListingFromDb(listingWithStatuses); // ✅ Now works without union type error
  return listing;
};

//function that checks if a listing is saved, installed, or requested by the current firm
function listingWithDerivedStatuses<
  T extends ListingFromDb | MarketplaceListingFromDb,
>(listing: T, currentFirmId: string): T & ListingStatuses {
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
    ...listing,
    isSaved,
    isInstalled,
    isRequested,
    requestStatus,
  } as T & ListingStatuses;
}
