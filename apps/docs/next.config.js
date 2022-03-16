module.exports = {
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],
  redirects: require('./next-redirect'),
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: process.env.IS_VERCEL_ENV === 'true'
  }
};
