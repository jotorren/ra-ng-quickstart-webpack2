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

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
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
