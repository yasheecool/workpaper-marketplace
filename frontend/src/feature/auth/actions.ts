'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const signOut = async () => {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }

  cookieStore.delete('selected_firm_id');

  redirect('/');
};
