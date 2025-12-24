'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { FirmRow, mapFirmsFromDb, FirmFromPayload } from '@/types/domain/firm';

export async function getFirms() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error) {
    console.log('Error fetching auth claims:', error);
  }

  const firmsFromClaims: FirmFromPayload[] =
    data?.claims.app_metadata?.workpapers.firms || [];
  const mappedFirmIds = firmsFromClaims.map((firm) => firm.id);

  // Fetch firms and related vendor_profile rows (left join)
  const { data: firms, error: dbFirmError } = await supabase
    .from('firm')
    .select('*, vendor_profile:vendor_profile!left(firm_id)')
    .in('id', mappedFirmIds);

  if (dbFirmError) {
    console.error('Error fetching firms:', dbFirmError);
    return [];
  }

  return mapFirmsFromDb(firms as FirmRow[]);
}
