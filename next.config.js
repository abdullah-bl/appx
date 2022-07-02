/** @type {import('next').NextConfig} */

const nextConfig = {
	// / Prefer loading of ES Modules over CommonJS
	reactStrictMode: true,
	output: 'standalone',
	experimental: {
		runtime: 'nodejs',
	},
}

module.exports = nextConfig
