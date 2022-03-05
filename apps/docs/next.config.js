module.exports = {
  target: 'serverless',
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],
  redirects: require('./next-redirect'),
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: process.env.IS_VERCEL_ENV === 'true'
  }
};
