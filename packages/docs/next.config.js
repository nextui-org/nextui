module.exports = {
  target: 'serverless',
  future: {
    webpack5: true,
  },
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],
  redirects: require('./next-redirect'),
};
