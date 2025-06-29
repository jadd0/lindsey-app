import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: any }) {
	const { user, isLoading: loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push('/login');
		}
	}, [user, loading, router]);

	// Show loading spinner while checking authentication
	if (loading) {
		return <div>Loading...</div>;
	}

	// Show nothing while redirecting
	if (!user) {
		return null;
	}

	// User is authenticated, show the protected content
	return children;
}
