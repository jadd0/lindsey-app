// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token =
		request.headers.get('authorization')?.replace('Bearer ', '') ||
		request.cookies.get('admin-token')?.value;

	if (!token) {
		return NextResponse.json(
			{ error: 'Unauthorised - Admin access required' },
			{ status: 401 }
		);
	}

	try {
		// Verify using Firebase Admin SDK
		const decodedToken = await adminAuth.verifyIdToken(token);

		const response = NextResponse.next();
		response.headers.set('x-admin-route', 'true');
		response.headers.set('x-pathname', pathname);
		response.headers.set('x-user-id', decodedToken.uid);
		response.headers.set('x-user-email', decodedToken.email || '');

		return response;
	} catch (error) {
		console.error('Token verification failed:', error);
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		);
	}
}

export const config = {
	matcher: ['/api/admin/:path*'],
};
