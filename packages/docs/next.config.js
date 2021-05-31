const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [require('@mapbox/rehype-prism')],
  },
});
module.exports = withMDX({
  future: {
    webpack5: true,
  },
  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],

  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/guide/introduction',
        permanent: true,
      },
      {
        source: '/guide',
        destination: '/docs/guide/introduction',
        permanent: true,
      },
    ];
  },
});
