module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: false
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    'babel-plugin-optimize-clsx',
    ['styled-jsx/babel', { optimizeForSpeed: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-runtime', { useESModules: true }]
  ],
  ignore: [
    /@babel[\\|/]runtime/,
    /\.stories\.(js|ts|tsx)$/,
    /\.test\.(js|ts|tsx)$/
  ]
};
