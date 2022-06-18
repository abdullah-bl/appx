/** @type {import('next').NextConfig} */

const nextConfig = {
	// / Prefer loading of ES Modules over CommonJS
	reactStrictMode: true,
	experimental: {
		outputStandalone: true,
	},
}

module.exports = nextConfig
