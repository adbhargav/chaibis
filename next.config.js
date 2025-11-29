/** @type {import("next").NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['resend']
  },
  // Add these configurations
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;