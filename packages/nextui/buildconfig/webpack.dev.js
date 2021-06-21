const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const sourcePath = path.join(__dirname, '../src');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  entry: {
    index: path.join(sourcePath, 'index.ts'),
  },
});
