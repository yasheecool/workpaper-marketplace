import { createClient } from '@/lib/supabase/serverClient';
import {
  type VendorProfileRow,
  mapVendorProfileFromDb,
} from '@/types/domain/vendor';
import { getFirmsContext } from '../firm';
import { mapVendorListingsFromDb, type VendorListingFromDb } from './types';

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
    return {
      data: null,
      error: error.message,
    };
  }

  const mappedData = mapVendorProfileFromDb(data as VendorProfileRow);
  console.log('Vendor profile data:', mappedData);

  return { data: mappedData, error: null };
};

export const getVendorListings = async (filters: {
  listingType: string;
  visibility: string;
  sortBy: string;
  searchQuery: string;
}) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();

  const query = supabase
    .from('listing')
    .select(
      `id, name, content_type, updated_at, updated_by_user(first_name, last_name), visibility, status`
    )
    .eq('owned_by_firm(id)', currentFirm!!.id);

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

  // if (filters.searchQuery) {
  //   query.ilike('name', `%${filters.searchQuery}%`);
  // }

  const { data, error } = await query;

  if (error || !data) {
    throw new Error('Error fetching vendor listings: ' + error?.message);
  }

  const mappedData = mapVendorListingsFromDb(
    data as unknown as VendorListingFromDb[]
  );

  console.log(mappedData);

  return mappedData;
};
