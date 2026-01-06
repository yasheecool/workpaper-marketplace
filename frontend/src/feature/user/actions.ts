'use server';
import { type UserProfileType } from '@/feature/user';
import { getUserClaims } from '../auth';
import { createClient } from '@/lib/supabase/serverClient';
import { refresh } from 'next/cache';

export const updateUserProfile = async (
  updatedUserData: Partial<UserProfileType>
) => {
  const supabase = await createClient();
  const claims = await getUserClaims();
  const userId = claims.sub;

  const { data, error } = await supabase
    .from('user')
    .update(updatedUserData)
    .eq('id', userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  refresh();
  return data;
};
