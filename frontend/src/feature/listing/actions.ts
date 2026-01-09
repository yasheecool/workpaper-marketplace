'use server';
import { refresh } from 'next/cache';
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

export const uninstallListing = async (listingId: string) => {
  const supabase = await createClient();
  const { currentFirm } = await getFirmsContext();
  const { sub: userId } = await getUserClaims();

  const firmId = currentFirm!!.id;

  const { data, error } = await supabase
    .from('installed_listing')
    .delete()
    .eq('listing_id', listingId)
    .eq('installed_by_firm', firmId)
    .eq('installed_by_user', userId)
    .select('listing_id');

  if (error || !data) {
    console.log(error);
    throw new Error(error.message);
  }

  return data[0].listing_id.name;
};

export const saveListing = async (
  listingId: string,
  type: 'save' | 'unsave'
) => {
  const supabase = await createClient();

  const { sub: userId } = await getUserClaims();
  const { currentFirm } = await getFirmsContext();
  console.log('invoked saveListing with', { listingId, type });
  const firmId = currentFirm!!.id;
  let response;
  if (type === 'save') {
    response = await supabase
      .from('saved_listing')
      .upsert({
        saved_by_user: userId,
        saved_by_firm: firmId,
        listing: listingId,
      })
      .select();
  } else {
    response = await supabase
      .from('saved_listing')
      .delete()
      .eq('listing', listingId)
      .eq('saved_by_firm', firmId);
  }
  refresh();
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
