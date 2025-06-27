import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { AuthProvider } from '@/contexts/auth';

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
					<AuthProvider>{children}</AuthProvider>
				</ReactQueryClientProvider>
			</body>
		</html>
	);
}
