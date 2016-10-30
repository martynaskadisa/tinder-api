'use strict'

var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')

webpackConfig.devtool = undefined
webpackConfig.output.filename = '[name].min.js'
webpackConfig.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
      screw_ie8: true
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

module.exports = webpackConfig
