const path = require('path')
const webpack = require('webpack')
const commonPlugins = require('./webpack/plugins')
const commonRules = require('./webpack/rules')

module.exports = {
  entry: {
    vendor: [path.join(__dirname, 'webpack', 'vendors.js')],
    app: [path.join(__dirname, 'src/index')],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    ...commonPlugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false, // eslint-disable-line
      },
    }),
    new webpack.BannerPlugin({
      banner: `Last update: ${new Date().toString()}`,
    }),
    // 抽离第三方库
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    // 抽离 webpack 自身代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity,
    }),
  ],
  module: {
    rules: [...commonRules],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
