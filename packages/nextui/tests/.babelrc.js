module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['styled-jsx/babel-test', '@babel/plugin-transform-runtime'],
  env: {
    test: {
      plugins: ['styled-jsx/babel-test'],
      presets: [
        [
          'next/babel',
          {
            'styled-jsx': {
              'babel-test': true,
            },
          },
        ],
      ],
    },
  },
};
