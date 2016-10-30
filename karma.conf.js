var webpackConfig = require('./webpack.config.js')

var configuration = {
  browsers: ['Chrome_without_security'],
  customLaunchers: {
    Chrome_without_security: {
      base: 'Chrome',
      flags: ['--disable-web-security']
    }
  },
  singleRun: true,
  frameworks: ['mocha'],
  files: [
    'test/**/*.test.js'
  ],
  preprocessors: {
    'test/**/*.test.js': ['webpack', 'sourcemap', 'env']
  },
  envPreprocessor: [
    'FACEBOOK_TOKEN',
    'FACEBOOK_ID',
    'TINDER_TOKEN'
  ],
  reporters: ['mocha'],
  client: {
    mocha: {
      timeout: '20000'
    }
  },
  webpack: webpackConfig,
  webpackServer: {
    noInfo: true
  }
  // phantomjsLauncher: {
  //   exitOnResourceError: true
  // }
}

module.exports = function (config) {
  config.set(configuration)
}
