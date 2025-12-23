import FirmSelection from '@/feature/firm-selection/FirmSelectionPage';
import { getFirms } from '@/feature/firm-selection/actions';
import { createClient } from '@/lib/supabase/serverClient';
import { Firm } from '@/types/types';
import Firms from '@/types/supabase/Firms';

const page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error) {
    console.log('Error fetching auth claims:', error);
  }

  const firmsFromClaims: Firm[] = data?.claims.app_metadata?.workpapers.firms;
  const mappedFirmIds = firmsFromClaims.map((firm) => firm.id);
  console.log(mappedFirmIds);

  const { data: firms, error: dbFirmError } = await supabase
    .from('firm')
    .select('*')
    .in('id', mappedFirmIds);

  if (dbFirmError) {
    console.error('Error fetching firms:', dbFirmError);
  }

  // console.log('Firms data:', firms);
  // console.log('Firms error:', dbFirmError);

  // return <p>Hello world</p>;
  return <FirmSelection firms={firms} />;
};
export default page;
