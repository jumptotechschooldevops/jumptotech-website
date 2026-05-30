import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if we have a session
  // We can't use @supabase/supabase-js fully here without complex setup or @supabase/ssr,
  // so we'll look for standard supabase auth cookies or fallback to simple token presence if needed.
  // The user requirement says "RBAC authentication and authorization: Admin, Student, Visitor"
  // "Public visitors cannot access protected course content"
  // Let's create a robust check utilizing standard cookies.

  // A simple and reliable way to check role from middleware when standard @supabase/auth-helpers isn't used
  // is to read the 'sb-<project-id>-auth-token' cookie.
  // Alternatively, since this is a Next.js App, we can also check the role from the token if possible, or protect it at the client level,
  // but true middleware protection needs the cookie.

  const isAuth = request.cookies.getAll().some(cookie => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token'));

  // Basic route protection mapping
  const path = request.nextUrl.pathname;



  // Protect /admin
  if (path.startsWith('/admin')) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect /student
  if (path.startsWith('/student')) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect /modules/[slug]/[lectureId] (course content)
  if (path.startsWith('/modules/') && path.split('/').length > 3) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/modules/:slug/:lectureId*'
  ]
};
