'use server';

import { createClient } from '@/lib/supabase/serverClient';
import {
  type MarketplaceListingFromDb,
  mapMarketplaceListingFromDb,
  type ListingFromDb,
  mapListingFromDb,
  type SavedListingFromDb,
  mapSavedListingsFromDb,
  type RequestedListingFromDb,
  mapRequestedListingsFromDb,
  type InstalledListingFromDb,
  mapInstalledListingsFromDb,
} from './types';

import { getFirmsContext } from '@/feature/firm';
import { mapListingContentFromDb } from './types';
import { mapListingRequestFromDb } from '../vendor';

export const getMarketplaceListings = async (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();

  const { search, page, sort } = params;
  const contentType = params['content-type'];
  const workpaperType = params['workpaper-type'];
  const entityType = params['entity-type'];
  const PER_PAGE = 10;
  const pageNum = Number(page) || 1;

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

  const query = supabase
    .from('listing')
    .select(SELECT_FIELDS, {
      count: 'estimated',
    })
    .eq('status', 'active')
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

  // Handle sorting
  const sortBy = sort || 'name'; // Default to 'name'
  if (sortBy === 'name') {
    query.order('name', { ascending: true });
  } else if (sortBy === 'updated_at') {
    query.order('updated_at', { ascending: false }); // Newest first
  }

  const { data: listingsFromDb, error, count } = await query;

  if (error || !listingsFromDb) {
    console.error('Error fetching listings:', error);

    throw new Error(
      error.message || 'An error occurred while fetching listings.'
    );
  }

  const totalPages = count ? Math.ceil(count / PER_PAGE) : 0;

  const data = listingsFromDb.map((listing) =>
    mapMarketplaceListingFromDb(
      listing as unknown as MarketplaceListingFromDb,
      currentFirm!.id
    )
  );

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
  const currentFirmId = currentFirm!.id;

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
    if (error.code === 'PGRST116') {
      // No rows found
      return null;
    }

    throw new Error(
      error.message || 'An error occurred while fetching the listing.'
    );
  }
  const listing = mapListingFromDb(
    listingFromDb as ListingFromDb,
    currentFirmId
  );
  return listing;
};

export const getSavedListings = async () => {
  const firms = await getFirmsContext();
  const currentFirmId = firms.currentFirm!.id;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('saved_listing')
    .select(
      `*,
      listing(id, name, images_link, content_type, owned_by_firm(id, name))`
    )
    .eq('saved_by_firm', currentFirmId);

  if (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while fetching saved listings.'
    );
  }

  const mappedData = mapSavedListingsFromDb(
    data as unknown as SavedListingFromDb[]
  );

  return mappedData;
};

export const getInstalledListings = async () => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();

  const { data, error } = await supabase
    .from('installed_listing')
    .select(
      `id,
      created_at,
      installed_by_user(first_name, last_name),
      listing(id,name,content_type, owned_by_firm(id, name))
      `
    )
    .eq('installed_by_firm', currentFirm!.id);

  if (error) {
    console.error('Error fetching installed listings:', error);
    throw new Error(
      error.message || 'An error occurred while fetching installed listings.'
    );
  }

  const mappedData = mapInstalledListingsFromDb(
    data as unknown as InstalledListingFromDb[]
  );

  return mappedData;
};

export const getRequestedListings = async () => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();

  const { data, error } = await supabase
    .from('listing_access_control')
    .select(
      `
      created_at,
      requested_by_user(first_name, last_name),
      listing(id, name, owned_by_firm(id, name), content_type),
      request_status
      `
    )
    .eq('requested_by_firm', currentFirm!.id);

  if (error || !data) {
    console.error('Error fetching requested listings:', error);
    throw new Error(
      error?.message || 'An error occurred while fetching requested listings.'
    );
  }

  const mappedData = mapRequestedListingsFromDb(
    data as unknown as RequestedListingFromDb[]
  );

  return mappedData;
};

export const getAvailableContent = async () => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();

  const { data, error } = await supabase
    .from('listing_content')
    .select(`*`)
    .eq('owned_by_firm', currentFirm!.id);

  if (error || !data) {
    console.error('Error fetching available content:', error);
    throw new Error(
      error.message || 'An error occurred while fetching available content.'
    );
  }

  const mappedData = data.map((content) => mapListingContentFromDb(content));

  return mappedData;
};

export const getListingRequests = async (
  listingId: string,
  status: 'pending' | 'completed'
) => {
  const supabase = await createClient();

  const query = supabase
    .from('listing_access_control')
    .select(
      `
      *,
      listing!inner(owned_by_firm, name, id, content_type),
      requested_by_firm(id, name),
      requested_by_user(id, first_name, last_name),
      actioned_by_user(id, first_name, last_name)
    `
    )
    .eq('listing', listingId);

  if (status === 'pending') {
    query.eq('request_status', 'pending');
  } else if (status === 'completed') {
    query.neq('request_status', 'pending');
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error('Error fetching listing requests:', error);
    throw new Error(
      error?.message || 'An error occurred while fetching listing requests.'
    );
  }

  const mappedRequests = data.map((request) =>
    mapListingRequestFromDb(request)
  );

  return mappedRequests;
};
