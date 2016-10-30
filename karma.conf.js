var webpackConfig = require('./webpack.config.js')

var configuration = {
  browsers: ['PhantomJS'],
  singleRun: true,
  frameworks: ['mocha'],
  files: [
    'test/**/*.test.js'
  ],
  preprocessors: {
    'test/**/*.test.js': ['webpack', 'sourcemap']
  },
  reporters: ['mocha'],
  client: {
    mocha: {
      timeout: '10000'
    }
  },
  webpack: webpackConfig,
  webpackServer: {
    noInfo: true
  },
  phantomjsLauncher: {
    exitOnResourceError: true
  }
}

module.exports = function (config) {
  config.set(configuration)
}
