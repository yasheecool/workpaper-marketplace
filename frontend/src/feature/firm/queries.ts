'use server';
import { createClient } from '@/lib/supabase/serverClient';
import { FirmRow, mapFirmsFromDb, FirmFromPayload } from '@/types/domain/firm';
import { cookies } from 'next/headers';

export async function getCurrentFirmIdFromCookies() {
  const currentFirmIdFromCookies = (await cookies()).get(
    'selected_firm_id'
  )?.value;

  if (!currentFirmIdFromCookies) {
    throw new Error('No firm selected');
  }

  return currentFirmIdFromCookies;
}

export async function getFirmsContext() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  //data and app_metadata are guaranteed to be non-null - proxy checks user claims, app metadata is always added by supabase when logging in!

  const firmsFromClaims: FirmFromPayload[] =
    data!.claims.app_metadata!.workpapers.firms;

  const currentFirmIdFromCookies = await getCurrentFirmIdFromCookies();
  const mappedFirmIds = firmsFromClaims.map((firm) => firm.id);

  // Fetch firms and related vendor_profile rows (left join)
  const { data: firmsFromDb, error: dbFirmError } = await supabase
    .from('firm')
    .select('*, vendor_profile:vendor_profile!left(firm_id)')
    .in('id', mappedFirmIds);

  if (dbFirmError) {
    console.error('Error fetching firms:', dbFirmError);
    throw new Error('Failed to fetch firms from database');
  }

  const firms = mapFirmsFromDb(firmsFromDb as FirmRow[]);

  const currentFirm = firms.find((f) => f.id === currentFirmIdFromCookies);

  return { allUserFirms: firms, currentFirm };
}
