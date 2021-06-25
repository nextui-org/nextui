async function redirect() {
  return [
    {
      source: '/docs',
      destination: '/docs/guide/getting-started',
      permanent: true,
    },
    {
      source: '/docs/getting-started',
      destination: '/docs/guide/getting-started',
      permanent: true,
    },
    {
      source: '/docs/components',
      destination: '/docs/components/text',
      permanent: true,
    },
    {
      source: '/components',
      destination: '/docs/components/text',
      permanent: true,
    },
    {
      source: '/guide',
      destination: '/docs/guide/getting-started',
      permanent: true,
    },
  ];
}

module.exports = redirect;
