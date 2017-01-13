var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
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
      'app': helpers.root('src', 'app')
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
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'ng-router-loader']
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
        loader: 'html-loader'
      },

      /* Raw loader support for *.css.
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },

      /* File loader for not Angular components CSS.
       */
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'file-loader?name=assets/css/[name].[hash].[ext]'
      },

      /* File loader for supporting images, for example, in CSS files.
       */
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader?name=assets/img/[name].[hash].[ext]'
      },

      /* File loader for supporting fonts.
       */
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

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
    })
  ]
};
