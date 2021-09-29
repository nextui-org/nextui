const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const sourcePath = path.join(__dirname, '../src');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  //   watch: true,
  entry: {
    index: path.join(sourcePath, 'index.ts'),
  },
  //   plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
