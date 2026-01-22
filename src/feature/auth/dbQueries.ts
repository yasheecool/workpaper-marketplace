'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { generateSuccessResult, generateErrorResult } from '@/types/types';

//Only meant to be used in non-public routes - as this will guarantee a logged in user
export const getUserClaims = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    throw new Error(
      error?.message ||
        'No data found in user claims - User might not be logged in.',
    );
  }

  return data.claims;
};

//For public routes where user might not be logged in
export const getUserClaimsPublic = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error) {
    console.error('Error fetching user claims:', error);
    throw new Error(error.message);
  }

  if (!data) {
    return generateErrorResult(
      'No data found in user claims - User might not be logged in.',
    );
  }

  return generateSuccessResult(data.claims);
};
