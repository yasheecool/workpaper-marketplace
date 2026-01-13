'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { type VendorProfile } from './types';
import { refresh } from 'next/cache';

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
