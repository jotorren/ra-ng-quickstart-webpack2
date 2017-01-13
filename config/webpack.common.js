var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    // 'vendor': './src/vendor.ts',
    'app': './src/app/main.ts'
  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'app': helpers.root('src', 'app'),

      '@angular/common': '@angular/common/bundles/common.umd.js',
      '@angular/compiler': '@angular/compiler/bundles/compiler.umd.js',
      // '@angular/core': '@angular/core/bundles/core.umd.js',
      '@angular/forms': '@angular/forms/bundles/forms.umd.js',
      '@angular/http': '@angular/http/bundles/http.umd.js',
      '@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': '@angular/router/bundles/router.umd.js',

      'ra-ng': 'ra-ng/bundles/ra-ng.umd.js',
      'lodash': 'lodash/lodash.js',
      'crypto-js':'crypto-js/crypto-js.js'
    }
  },

  module: {
    rules: [
      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       * Replace templateUrl and stylesUrl with require()
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       * See: https://github.com/TheLarkInn/angular2-template-loader
       */
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader', 'ng-router-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },

      /* Html loader support for *.html files.
       * Exports HTML as string. HTML is minimized when the compiler demands.
       *
       * See: https://github.com/webpack/html-loader
       */
      {
        test: /\.html$/,
        use: 'html-loader'
      },

      /* Raw loader support for *.css.
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: 'raw-loader'
      },

      /* File loader for not Angular components CSS.
       */
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: 'file-loader?name=assets/css/[name].[hash].[ext]'
      },

      /* File loader for supporting images, for example, in CSS files.
       */
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: 'file-loader?name=assets/img/[name].[hash].[ext]'
      },

      /* File loader for supporting fonts.
       */
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    /*
     * It identifies the hierarchy among three chunks: app -> vendor -> polyfills. 
     * Where Webpack finds that app has shared dependencies with vendor, it removes them from app. 
     * It would do the same if vendor and polyfills had shared dependencies (which they don't).
     * 
     * See: https://angular.io/docs/ts/latest/guide/webpack.html#!#configure-webpack
     */
    new webpack.optimize.CommonsChunkPlugin({
      // name: ['app', 'vendor', 'polyfills']
      name: ['app', 'polyfills']
    }),

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     * 
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      helpers.root('src'), // location of your src
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([
      { context: 'src', from: 'assets/**/*' },
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'assets/css', toType: 'dir' },
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', to: 'assets/css', toType: 'dir' },
      { from: 'node_modules/primeui/primeui-ng-all.min.css', to: 'assets/css', toType: 'dir' },
      { from: 'node_modules/quill/dist/quill.snow.css', to: 'assets/css', toType: 'dir' },
      { from: 'node_modules/quill/dist/quill.bubble.css', to: 'assets/css', toType: 'dir' },
      { from: 'node_modules/primeui/themes/redmond/theme.css', to: 'assets/css/primeui-redmond-theme.css', toType: 'file' },

      { context: 'src', from: '*.ico' },
      { context: 'src', from: 'environments/**/*.json' },
      { context: 'src', from: 'app/**/*.json' }
    ], {}),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'static',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'size.html',
      // Automatically open report in default browser
      openAnalyzer: false,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'info'
    })
  ]
};
