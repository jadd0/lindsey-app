import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from 'sonner';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from './_components/layout/Navbar';
import Footer from './_components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
	title: "Lindsey's Shop",
	description: 'A shop for all things quirky and unique!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-[#0089ff] text-white overflow-x-hidden">
				<ReactQueryClientProvider>
					<Toaster position="top-right" closeButton={false} />
					<AuthProvider>
						{/* <ReactLenis root /> */}
						<Navbar />
						{children}
						<Footer />
						<Analytics />
					</AuthProvider>
				</ReactQueryClientProvider>
			</body>
		</html>
	);
}
