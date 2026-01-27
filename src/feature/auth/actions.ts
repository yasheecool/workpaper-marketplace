'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signOut = async () => {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  cookieStore.delete('selected_firm_id');

  redirect(`/?t=${Date.now()}`);
};

export async function signInDemoUser(
  _prevState: { success: boolean; message: string },
  _formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.DEMO_USER_EMAIL as string,
    password: process.env.DEMO_USER_PASSWORD as string,
  });

  if (error) return { success: false, message: error.message };
  if (!data.user) return { success: false, message: 'User data not found' };
  await deleteUserDataFromApp(data.user.id);

  redirect('/firm-selection');
}

async function deleteUserDataFromApp(userId: string) {
  const supabase = await createClient();

  try {
    const { error: installedListingError } = await supabase
      .from('installed_listing')
      .delete()
      .eq('installed_by_user', userId);

    if (installedListingError) {
      console.error(
        'Error deleting installed listings:',
        installedListingError,
      );
    }

    const { error: accessControlRequestError } = await supabase
      .from('listing_access_control')
      .delete()
      .eq('requested_by_user', userId);

    if (accessControlRequestError) {
      console.error(
        'Error deleting access control requests:',
        accessControlRequestError,
      );
    }

    const { error: accessControlActionError } = await supabase
      .from('listing_access_control')
      .delete()
      .eq('actioned_by_user', userId);

    if (accessControlActionError) {
      console.error(
        'Error deleting access control actions:',
        accessControlActionError,
      );
    }

    const { error: savedListingError } = await supabase
      .from('saved_listing')
      .delete()
      .eq('saved_by_user', userId);

    if (savedListingError) {
      console.error('Error deleting saved listings:', savedListingError);
    }
  } catch (error) {
    console.error('Error deleting user data:', error);
  }
}
