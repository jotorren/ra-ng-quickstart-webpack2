const ngToolsWebpack = require('@ngtools/webpack');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionPlugin = require("compression-webpack-plugin");
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

console.log('AoT processing');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/app/main-aot.ts'
    },
    output: {
        path: helpers.root('dist/public'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.prod-aot.json',
            entryModule: helpers.root('src') + '/app/app.module#AppModule'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills']
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
        }),
        new webpack.NoErrorsPlugin(),
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
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ],
    module: {
        rules: [
            { test: /\.json$/, use: 'json-loader' },
            { test: /\.scss$/, use: ['raw-loader', 'sass-loader'] },
            { test: /\.css$/, include: helpers.root('src', 'app'), use: 'raw-loader' },
            { test: /\.css$/, exclude: helpers.root('src', 'app'), use: 'file-loader?name=assets/css/[name].[hash].[ext]' },
            { test: /\.(png|jpe?g|gif|ico)$/, use: 'file-loader?name=assets/img/[name].[hash].[ext]' },
            { test: /\.(svg|woff|woff2|ttf|eot)$/, use: 'file-loader?name=assets/fonts/[name].[hash].[ext]' },
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.ts$/, use: '@ngtools/webpack' }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};

