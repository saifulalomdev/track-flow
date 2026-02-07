import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWTToken } from './lib/jwt-token';

// Note: Next.js looks for the function named 'middleware', not 'proxy'
export async function proxy(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value; 

    // 1. Check if token exists
    if (!token) {
        // Redirect syntax: (Target URL string, Base URL)
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // 2. Verify the token (must use await if verifyJWTToken is async)
    const payload = await verifyJWTToken(token);

    // 3. Handle invalid/expired tokens
    if (!payload) {
        const response = NextResponse.redirect(new URL("/sign-in", request.url));
        // Optional: Clear the invalid cookie so they don't loop
        response.cookies.delete('auth_token');
        return response;
    }

    // 4. Everything is good
    return NextResponse.next();
}

// Important: Matcher ensures this doesn't run on images/favicon
export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*'],
};