'use server';

import { createClient } from '@/lib/supabase/serverClient';
import {
  type MarketplaceListingFromDb,
  mapMarketplaceListingsFromDb,
  mapListingFromDb,
  ListingStatusesFromDb,
} from './types';
import { type ListingRow } from '@/types/domain/listing';
import { getFirmsContext } from '@/feature/firm';

type ListingWithStatusesFromDb = ListingRow & ListingStatusesFromDb;

const SELECT_FIELDS = `
  id,
  name, 
  description, 
  content_type, 
  updated_at, 
  images_link,
  visibility,
  owned_by_firm:firm!listing_owned_by_firm_fkey(id, name),
  saved_listing!saved_listing_listing_id_fkey(id, saved_by_firm),
  installed_listing!installed_listing_listing_id_fkey(id, installed_by_firm),
  listing_access_control!listing_access_control_listing_id_fkey(id, requested_by_firm_id, request_status)
`;

export const getMarketplaceListings = async (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();

  const { search, page = 1 } = params;
  const contentType = params['content-type'];
  const workpaperType = params['workpaper-type'];
  const entityType = params['entity-type'];
  const PER_PAGE = 10;

  const query = supabase
    .from('listing')
    .select(SELECT_FIELDS, {
      count: 'estimated',
    })
    .range((Number(page) - 1) * PER_PAGE, Number(page) * PER_PAGE - 1);

  // Filter the joined tables to only show records for current firm
  if (currentFirm?.id) {
    query.eq('saved_listing.saved_by_firm', currentFirm.id);
    query.eq('installed_listing.installed_by_firm', currentFirm.id);
    query.eq('listing_access_control.requested_by_firm_id', currentFirm.id);
  }

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

    // return {
    //   data: null,
    //   count: 0,
    //   totalPages: 0,
    //   currentPage: Number(page),
    // };
  }

  const totalPages = count ? Math.ceil(count / PER_PAGE) : 0;

  const data = mapMarketplaceListingsFromDb(
    listingsFromDb as unknown as MarketplaceListingFromDb[]
  );

  return {
    data,
    count,
    totalPages,
    currentPage: Number(page),
  };
};

export const getListingById = async (listingId: string) => {
  const supabase = await createClient();

  const { data: listingFromDb, error } = await supabase
    .from('listing')
    .select(
      `*, 
      owned_by_firm:firm!listing_owned_by_firm_fkey(id, name),
      saved_listing!saved_listing_listing_id_fkey(id, saved_by_firm),
      installed_listing!installed_listing_listing_id_fkey(id, installed_by_firm),
      listing_access_control!listing_access_control_listing_id_fkey(id, requested_by_firm_id, request_status)`
    )
    .eq('id', listingId)
    .single();

  if (error) {
    console.error('Error fetching listing by ID:', error);
    return { data: null, error: error.message || 'an error occurred' };
  }
  const listing = mapListingFromDb(listingFromDb as ListingWithStatusesFromDb);

  return { data: listing, error: null };
};
