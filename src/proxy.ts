import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { NextResponse } from 'next/server';

//including / in public urls will cause a bug because all urls start with /
const publicUrls = ['/login', '/auth', '/listing', '/vendor-details'];

export async function proxy(request: NextRequest) {
  const { supabaseResponse, userClaims } = await updateSession(request);
  const selectedFirm = request.cookies.get('selected_firm_id')?.value;

  //If no user session found, and url is not homepage or public url, redirect to login
  if (
    !userClaims &&
    request.nextUrl.pathname !== '/' &&
    !publicUrls.some((url) => request.nextUrl.pathname.startsWith(url))
  ) {
    console.log('No user session found, will redirect to login');
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  //If user is logged in but has not selected a firm, redirect to firm selection page
  if (
    userClaims &&
    !selectedFirm &&
    request.nextUrl.pathname !== '/firm-selection'
  ) {
    console.log('No firm selected');
    const url = request.nextUrl.clone();
    url.pathname = '/firm-selection';
    return NextResponse.redirect(url);
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
