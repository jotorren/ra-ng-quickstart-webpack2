var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader', 'ng-router-loader']
      },
      {
        test: /\.html$/,
        use: 'html-loader'

      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: 'null-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'null-loader'
      }
    ]
  }
}
