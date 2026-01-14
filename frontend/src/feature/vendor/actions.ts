'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { type VendorProfile } from './types';
import { refresh } from 'next/cache';
import { getUserClaims } from '../auth';

export const updateVendorProfile = async (
  vendorId: string,
  updatedFields: Partial<VendorProfile>
) => {
  const supabase = await createClient();
  console.log(updatedFields);

  const { data, error } = await supabase
    .from('vendor_profile')
    .update(updatedFields)
    .eq('id', vendorId);

  if (error) {
    console.log('Error updating vendor profile:', error);
    throw new Error(error.message);
  }

  refresh();

  return data;
};

export const updateListingRequest = async (
  requestId: string,
  action: 'approved' | 'rejected'
) => {
  console.log('Updating request:', requestId, 'with action:', action);
  const supabase = await createClient();
  const claims = await getUserClaims();
  console.log('User claims:', claims);
  const { data, error } = await supabase
    .from('listing_access_control')
    .update({
      request_status: action,
      actioned_by_user: claims?.sub,
    })
    .eq('id', requestId);

  if (error) {
    console.log('Error updating listing request:', error);
    throw new Error(error.message);
  }

  return data;
};
