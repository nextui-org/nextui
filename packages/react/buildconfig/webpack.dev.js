const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const sourcePath = path.join(__dirname, '../src');

module.exports = merge(common, {
  watch: true,
  entry: {
    index: path.join(sourcePath, 'index.ts'),
  },
});
