var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'), // click "Debug" in browser to see it
      require('karma-htmlfile-reporter'), // crashing w/ strange socket error
      require('karma-coverage'),
      require('karma-sourcemap-loader'),
      require('karma-webpack')
    ],

    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
    ],

    exclude: [
        'e2e/**/*.*'
    ],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap'],
      'src/**/!(*spec).js': ['coverage']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    // disabled HtmlReporter; suddenly crashing w/ strange socket error
    reporters: ['progress', 'html', 'coverage'], //'kjhtml' 'html'],

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'doc/coverage/' }
      ]
    },

    // HtmlReporter configuration
    htmlReporter: {
      // Open this file to see results in browser
      outputFile: 'doc/unit-tests-result.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: __dirname
    },

    browsers: ['Chrome'],

    port: 9876,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    colors: true,
    autoWatch: false,
    singleRun: true,

    captureTimeout: 120000,
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000
  };

  config.set(_config);
};
