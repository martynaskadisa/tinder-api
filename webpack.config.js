var path = require('path')

var config = {
  devtool: 'eval-source-map',
  entry: {
    'tinderapi': path.join(__dirname, 'src/global.js')
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      tinderapi: 'src/tinderapi.js'
    },
    extensions: ['', '.js']
  }
}

module.exports = config
