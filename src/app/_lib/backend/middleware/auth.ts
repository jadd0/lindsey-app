// middleware.ts
import { NextRequest } from 'next/server';
import { authMiddleware } from 'next-firebase-auth-edge';

export async function middleware(request: NextRequest) {
	return authMiddleware(request, {
		loginPath: '/api/login',
		logoutPath: '/api/logout',
		apiKey: 'your-firebase-api-key',
		cookieName: 'AuthToken',
		cookieSignatureKeys: ['your-secret-key'],
		cookieSerializeOptions: {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 12 * 60 * 60 * 24, // twelve days
		},
		serviceAccount: {
			projectId: 'your-project-id',
			clientEmail: 'your-service-account-email',
			privateKey: 'your-private-key',
		},
		handleValidToken: async ({ token, decodedToken }, headers) => {
			return NextResponse.next({ request: { headers } });
		},
		handleInvalidToken: async (reason) => {
			return redirectToLogin(request, {
				path: '/login',
				publicPaths: ['/', '/about'],
			});
		},
	});
}

export const config = {
	matcher: ['/dashboard/:path*', '/admin/:path*', '/api/protected/:path*'],
};
