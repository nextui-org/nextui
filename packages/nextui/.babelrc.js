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

  return {
    presets: [
      [
        '@react-bootstrap',
        {
          dev,
          modules,
          removePropTypes: !dev,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: ['styled-jsx/babel'],
    ignore: [
      /@babel[\\|/]runtime/,
      /\.stories\.(js|ts|tsx)$/,
      /\.test\.(js|ts|tsx)$/,
    ],
  };
};
