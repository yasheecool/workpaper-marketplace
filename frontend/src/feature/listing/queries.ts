'use server';

import { createClient } from '@/lib/supabase/serverClient';
import {
  type MarketplaceListingFromDb,
  mapMarketplaceListingsFromDb,
} from './types';

export const getMarketplaceListings = async (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const supabase = await createClient();

  const perPage = 10;

  const { search, page = 1 } = params;
  const contentType = params['content-type'];
  const workpaperType = params['workpaper-type'];
  const entityType = params['entity-type'];

  const query = supabase
    .from('listing')
    .select(
      'id,name, description, content_type, updated_at, images_link, visibility, owned_by_firm(id, name)',
      {
        count: 'estimated',
      }
    )
    .range((Number(page) - 1) * perPage, Number(page) * perPage - 1);

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
    return { data: null, error: error.message || 'an error occurred' };
  }

  const totalPages = count ? Math.ceil(count / perPage) : 0;

  const listings = mapMarketplaceListingsFromDb(
    listingsFromDb as unknown as MarketplaceListingFromDb[]
  );

  return {
    data: listings,
    error: null,
    count,
    totalPages,
    currentPage: Number(page),
  };
};
