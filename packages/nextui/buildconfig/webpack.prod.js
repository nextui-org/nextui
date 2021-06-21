const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const sourcePath = path.join(__dirname, '../src');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    index: path.join(sourcePath, 'index.ts'),
    'index.min': path.join(sourcePath, 'index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    library: 'NextUI',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  },
});
