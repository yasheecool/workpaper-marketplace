'use server';
import { getUserClaims } from '../user';
import { getFirmsContext } from '../firm';
import { createClient } from '@/lib/supabase/serverClient';
import { refresh } from 'next/cache';

export const installListing = async (listingId: string) => {
  const userClaims = await getUserClaims();
  console.log('User Claims:', userClaims);
  //logic to install listing
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

  refresh(); // Refresh the cache to reflect changes
  return response;
};

export const requestListing = async (listingId: string) => {
  //logic to request listing access
};
