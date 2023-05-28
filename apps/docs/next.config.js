/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nextui-org/react', '@nextui-org/theme'],
  swcMinify: true,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  redirects: require("./next-redirect"), 
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.IS_VERCEL_ENV === "true",
  },
};

module.exports = nextConfig;
