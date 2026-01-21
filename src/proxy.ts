import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { NextResponse } from 'next/server';

const openUrls = ['/login', '/auth', '/', '/listing', '/vendor-details'];

export async function proxy(request: NextRequest) {
  const { supabaseResponse, userClaims } = await updateSession(request);
  const selectedFirm = request.cookies.get('selected_firm_id')?.value;

  if (
    !userClaims &&
    !openUrls.some((url) => request.nextUrl.pathname.startsWith(url))
  ) {
    console.log('No user session found, will redirect to login');
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  } else console.log('User logged in!');

  if (
    !selectedFirm &&
    !request.nextUrl.pathname.startsWith('/firm-selection')
  ) {
    console.log('No firm selected');
    // no firm selected, redirect to firm selection page
    const url = request.nextUrl.clone();
    url.pathname = '/firm-selection';
    // return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
