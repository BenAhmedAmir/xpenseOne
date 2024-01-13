// @ts-ignore
const { merge } = require('webpack-merge');
// @ts-ignore
const common = require('./webpack.common.ts');

module.exports = merge(common, {
  watch: true,
  devtool: "source-map",
  mode: "development",
});