import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from 'sonner';

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
			<body>
				<ReactQueryClientProvider>
					<Toaster position="top-right" closeButton={false} />
					<AuthProvider>{children}</AuthProvider>
				</ReactQueryClientProvider>
			</body>
		</html>
	);
}
