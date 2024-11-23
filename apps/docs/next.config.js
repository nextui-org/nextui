const withContentlayer = require("next-contentlayer2").withContentlayer;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nextui-org/react", "@nextui-org/theme"],
  swcMinify: true,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  redirects: require("./next-redirect.js"),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ignoreBuildErrors: process.env.IS_VERCEL_ENV === "true",
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "opencollective-production.s3.us-west-1.amazonaws.com",
      "avatars.githubusercontent.com",
      "logo.clearbit.com",
      "i.pravatar.cc",
      "nextui.org",
    ],
  },
  rewrites: async () => {
    return [
      {
        destination: "https://us-assets.i.posthog.com/static/:path*",
        source: "/ingest/static/:path*",
      },
      {
        destination: "https://us.i.posthog.com/:path*",
        source: "/ingest/:path*",
      },
      {
        destination: "https://us.i.posthog.com/decide",
        source: "/ingest/decide",
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
