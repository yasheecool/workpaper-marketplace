'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { mapUserFromDb, UserRow } from '@/types/domain/user';
import { getUserClaims } from '../auth';

export const getUserFromDB = async () => {
  const supabase = await createClient();
  const data = await getUserClaims();
  const userId = data.sub;

  const { data: userData, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !userData) {
    console.error('Error fetching user from DB:', error);
    throw new Error('An error occurred while fetching user data.');
  }

  const mappedUser = mapUserFromDb(userData as UserRow);

  return mappedUser;
};
