module.exports = {
  target: 'serverless',
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],
  redirects: require('./next-redirect'),
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
