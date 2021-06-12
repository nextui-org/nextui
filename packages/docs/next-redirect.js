async function redirect() {
  return [
    {
      source: '/docs',
      destination: '/docs/guide/getting-started',
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
