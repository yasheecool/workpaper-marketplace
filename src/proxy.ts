import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { NextResponse } from 'next/server';

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/auth',
  '/listing', // Public listing view
  '/vendor-details', // Public vendor profile
];

// Routes that require authentication but not firm selection
const authOnlyRoutes = ['/firm-selection'];

export async function proxy(request: NextRequest) {
  const { supabaseResponse, userClaims } = await updateSession(request);
  const selectedFirm = request.cookies.get('selected_firm_id')?.value;

  const pathname = request.nextUrl.pathname;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  // Check if route only needs auth (not firm selection)
  const isAuthOnlyRoute = authOnlyRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  // No user session and trying to access protected route
  if (!userClaims && !isPublicRoute) {
    console.log('No user session, redirecting to login');
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // User logged in but no firm selected (skip for auth-only routes)
  if (userClaims && !selectedFirm && !isPublicRoute && !isAuthOnlyRoute) {
    console.log('No firm selected, redirecting to firm selection');
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
