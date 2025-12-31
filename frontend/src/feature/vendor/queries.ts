import { createClient } from '@/lib/supabase/serverClient';
import {
  type VendorProfileRow,
  mapVendorProfileFromDb,
} from '@/types/domain/vendor';

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
