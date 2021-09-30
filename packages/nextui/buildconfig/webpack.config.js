module.exports = (distRoot, optimize) => ({
  mode: 'production',
  optimization: {
    minimize: !!optimize,
  },
  entry: './src/index.ts',
  output: {
    path: distRoot,
    filename: optimize ? 'nextui.min.js' : 'nextui.js',
    library: 'NextUI',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            envName: `dist-${optimize ? 'prod' : 'dev'}`,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'styled-jsx': {
      root: '_JSXStyle',
      commonjs2: 'styled-jsx',
      commonjs: 'styled-jsx',
      amd: 'styled-jsx',
    },
  },
});
