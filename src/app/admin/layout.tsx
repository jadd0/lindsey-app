'use client';

import { useAuth } from '@/contexts/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	console.log(pathname != '/admin/login');


	useEffect(() => {
		if (!isLoading && !user && pathname != '/admin/login') {
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

	if (!user && pathname != '/admin/login') {
		return null;
	}

	return (
		<div className="font-sans overflow-x-hidden">
			<main className="p-6">{children}</main>
		</div>
	);
}
