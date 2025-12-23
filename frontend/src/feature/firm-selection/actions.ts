'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { Firm } from '@/types/types';

export async function getFirms() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error) {
    console.log('Error fetching auth claims:', error);
  }

  const firmsFromClaims: Firm[] = data?.claims.app_metadata?.workpapers.firms;

  const { data: firms, error: dbFirmError } = await supabase
    .from('firms')
    .select('*')
    .in(
      'id',
      firmsFromClaims.map((firm) => firm.id)
    );

  console.log('Firms fetched from DB:', firms);

  if (dbFirmError) {
    console.log('Error fetching firms from DB:', dbFirmError);
  }

  return firms || [];
}
