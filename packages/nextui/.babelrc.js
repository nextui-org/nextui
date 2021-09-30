module.exports = (api) => {
  const env = api.env();

  let dev = false;
  let modules;

  switch (env) {
    case 'docs':
    case 'test':
    case 'dist-dev':
      dev = true;
      modules = false;
      break;
    case 'dist-prod':
    case 'esm':
      modules = false;
      break;
    case 'cjs':
    default:
      modules = 'commonjs';
  }

  const presets =
    env !== 'test'
      ? [
          [
            '@react-bootstrap',
            {
              dev,
              modules,
              removePropTypes: !dev,
            },
          ],
          '@babel/preset-typescript',
        ]
      : ['@babel/env', '@babel/react', '@babel/preset-typescript'];

  const plugins =
    env !== 'test' ? ['styled-jsx/babel'] : ['styled-jsx/babel-test'];

  return {
    presets,
    plugins,
    ignore:
      env !== 'test'
        ? [
            /@babel[\\|/]runtime/,
            /\.stories\.(js|ts|tsx)$/,
            /\.test\.(js|ts|tsx)$/,
          ]
        : [],
  };
};
