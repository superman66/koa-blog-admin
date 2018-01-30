const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const extractSass = require('./extractSass');

module.exports = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new HtmlwebpackPlugin({
    title: 'Koa Blog Admin',
    filename: 'index.html',
    template: 'src/index.html',
    theme: 'default',
    inject: true,
  }),
  extractSass
];
