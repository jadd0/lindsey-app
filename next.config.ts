import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
};

module.exports = {
	typescript: {
		ignoreBuildErrors: true,
	},
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
	  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
