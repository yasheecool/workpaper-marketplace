import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/serverClient';

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl;
  const tokenHash = url.searchParams.get('token_hash');
  const origin = url.origin;

  // Redirect to login if token_hash is missing
  if (!tokenHash) {
    return NextResponse.redirect(new URL('/login', origin));
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'email',
    });

    if (error) {
      console.error('Error verifying OTP:', error);
      return NextResponse.redirect(new URL('login', origin));
    }

    // Redirect to firm selection on success
    return NextResponse.redirect(new URL('firm-selection', origin));
  } catch (err) {
    // console.error('Unexpected error during OTP verification:', err);
    return NextResponse.redirect(new URL('login', origin));
  }
};
