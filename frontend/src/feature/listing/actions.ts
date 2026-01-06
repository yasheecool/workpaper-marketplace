'use server';
import { getUserClaims } from '../auth';
import { getFirmsContext } from '../firm';
import { createClient } from '@/lib/supabase/serverClient';

export const installListing = async (listingId: string) => {
  const userClaims = await getUserClaims();
  const { sub: userId } = userClaims;
  const { currentFirm } = await getFirmsContext();

  const firmId = currentFirm!!.id;

  const supabase = await createClient();

  const { data, error } = await supabase.from('installed_listing').insert({
    installed_by_user: userId,
    installed_by_firm: firmId,
    listing_id: listingId,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return { data };
};

export const saveListing = async (
  listingId: string,
  type: 'save' | 'unsave'
) => {
  const supabase = await createClient();

  const { sub: userId } = await getUserClaims();
  const { currentFirm } = await getFirmsContext();

  const firmId = currentFirm!!.id;
  let response;
  if (type === 'save') {
    response = await supabase
      .from('saved_listing')
      .upsert({
        saved_by_user: userId,
        saved_by_firm: firmId,
        listing_id: listingId,
      })
      .select();
  } else {
    console.log(userId, firmId, listingId);
    response = await supabase
      .from('saved_listing')
      .delete()
      .eq('listing_id', listingId)
      .eq('saved_by_firm', firmId);
  }

  return response;
};

export const requestListing = async (listingId: string) => {
  const userClaims = await getUserClaims();
  const { sub: userId } = userClaims;
  const { currentFirm } = await getFirmsContext();

  const firmId = currentFirm!!.id;

  const supabase = await createClient();

  const { data, error } = await supabase.from('listing_access_control').insert({
    requested_by_user: userId,
    requested_by_firm: firmId,
    listing_id: listingId,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return { data };
};
