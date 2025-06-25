/**
 * For developing docs
 */
'use strict'
const path = require('node:path')

module.exports = {
  entry: {
    app: './docs/app.js'
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].bundle.js',
    publicPath: '/docs/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  performance: {
    hints: false
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    devMiddleware: {
      writeToDisk: true
    }
  }
}
