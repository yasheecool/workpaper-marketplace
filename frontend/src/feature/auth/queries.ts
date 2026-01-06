import { createClient } from '@/lib/supabase/serverClient';

export const getUserClaims = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data) throw new Error('No user claims found');

  return data.claims; //claims always exist because of auth middleware
};
