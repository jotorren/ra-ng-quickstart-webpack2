var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist/public'),
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
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
        use: ['awesome-typescript-loader?{configFileName: "tsconfig.json"}', 'angular2-template-loader', 'ng-router-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
  ]},

  plugins: [
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
