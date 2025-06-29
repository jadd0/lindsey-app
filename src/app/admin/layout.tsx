'use client';

import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/admin/login');
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return (
			<div className="font-sans flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<div className="font-sans">
			<main className="p-6">{children}</main>
		</div>
	);
}
