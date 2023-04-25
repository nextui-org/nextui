/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nextui-org/react', '@nextui-org/theme'],
  swcMinify: true,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  // redirects: require("./next-redirect"), TODO: enable this once we have the docs structure done
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.IS_VERCEL_ENV === "true",
  },
};

module.exports = nextConfig;
