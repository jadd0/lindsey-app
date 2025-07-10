import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
};

module.exports = {
	experimental: {
		serverActions: {
			bodySizeLimit: '30mb',
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'a9ykizubok.ufs.sh',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
