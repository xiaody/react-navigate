/**
 * For developing docs
 */
'use strict'
const path = require('path')
const webpack = require('webpack')
const target = process.env.npm_lifecycle_event

const plugins = []
if (target === 'docs') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
}

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
      {test: /\.jsx?$/, use: 'babel-loader'},
      {test: /\.css?$/, use: ['style-loader', 'css-loader']}
    ]
  },
  performance: {
    hints: false
  },
  plugins,
  devServer: {
    host: '0.0.0.0'
  }
}
