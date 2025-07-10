import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from 'sonner';
import { ReactLenis, useLenis } from 'lenis/react'
import Navbar from './_components/layout/Navbar';

export const metadata: Metadata = {
	title: 'Your App',
	description: 'Your app description',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-[#1e60e1] text-white">
				<ReactQueryClientProvider>
					<Toaster position="top-right" closeButton={false} />
					<AuthProvider>
						<ReactLenis root />
						<Navbar />
						{children}
					</AuthProvider>
				</ReactQueryClientProvider>
			</body>
		</html>
	);
}
