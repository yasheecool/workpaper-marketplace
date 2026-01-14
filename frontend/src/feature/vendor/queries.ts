'use server';

import { createClient } from '@/lib/supabase/serverClient';
import {
  type VendorProfileRow,
  mapVendorProfileFromDb,
} from '@/types/domain/vendor';
import { getFirmsContext } from '../firm';
import {
  mapVendorListingsFromDb,
  type VendorListingFromDb,
  mapListingRequestFromDb,
} from './types';

export const getVendorProfile = async (vendorId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendor_profile')
    .select(
      `*,
        firm(name)
         `
    )
    .eq('firm_id', vendorId)
    .single();

  if (error) {
    console.log('Error fetching vendor profile:', error);
    throw new Error(error.message);
  }

  const mappedData = mapVendorProfileFromDb(data as VendorProfileRow);

  return mappedData;
};

export const getVendorListings = async (filters: {
  listingType: string;
  visibility: string;
  sortBy: string;
  searchQuery: string;
}) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();
  const vendorId = currentFirm!!.id;

  const query = supabase
    .from('listing')
    .select(
      `id, name, content_type, updated_at, updated_by_user(first_name, last_name), visibility, status`
    )
    .eq('owned_by_firm(id)', vendorId);

  if (filters.listingType !== 'all') {
    query.eq('content_type', filters.listingType);
  }

  if (filters.visibility !== 'all') {
    query.eq('visibility', filters.visibility);
  }

  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    query.textSearch('name', filters.searchQuery.trim(), {
      type: 'plain',
    });
  }

  if (filters.sortBy) {
    const isAscending = filters.sortBy === 'name' ? true : false;
    query.order(filters.sortBy, { ascending: isAscending });
  }

  const { data, error } = await query;

  if (error || !data) {
    throw new Error('Error fetching vendor listings: ' + error?.message);
  }

  const mappedData = mapVendorListingsFromDb(
    data as unknown as VendorListingFromDb[]
  );

  return mappedData;
};

export const getVendorListingRequests = async (
  type: 'pending' | 'completed'
) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();
  const vendorId = currentFirm!!.id;

  const query = supabase
    .from('listing_access_control')
    .select(
      '*, listing!inner(owned_by_firm, name, id, content_type), requested_by_firm(name), requested_by_user(first_name, last_name), actioned_by_user(first_name, last_name)'
    )
    .eq('listing.owned_by_firm', vendorId);

  if (type === 'pending') {
    query
      .eq('request_status', 'pending')
      .order('listing(name)', { ascending: true });
  } else {
    query.neq('request_status', 'pending');
  }

  const { data, error } = await query;

  if (error || !data) {
    console.log(error);
    throw new Error(
      'Error fetching vendor listing requests: ' + error?.message
    );
  }

  const mappedData = data.map((item) => mapListingRequestFromDb(item));

  return mappedData;
};
