'use server';
import { createClient } from '@/lib/supabase/serverClient';
import { mapUserFromDb, UserRow } from '@/types/domain/user';

export const getUserFromDB = async () => {
  const supabase = await createClient();
  const data = await supabase.auth.getClaims();
  const userId = data?.data?.claims.sub;

  const { data: userData, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single();

  const mappedUser = mapUserFromDb(userData as UserRow);

  return mappedUser;
};
