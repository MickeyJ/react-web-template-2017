const path = require('path');
const config = require('../');
const srcPathJoin = require('../helpers').srcPathJoin;
const webpackDefaults = require('./webpack.default');
const manifest = require('../manifest');

const ManifestJsonPlugin = require('../plugins/ManifestJsonPlugin');

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const appStyle = new ExtractTextPlugin('[name].[contenthash:10].css');
const vendorStyle = new ExtractTextPlugin('vendor.[contenthash:10].css');

module.exports = {
  bail: true,
  devtool: 'hidden-source-map',
  resolve:{
    extensions: [
      '.js',
      '.scss',
      '.css'
    ],
    modules: ['node_modules', config.PATH.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    alias: {
      'babel-runtime': path.dirname(
        require.resolve('babel-runtime/package.json')
      ),
    },
    plugins: [
      new ModuleScopePlugin(config.PATH.src, [config.PATH.pkgJson]),
    ],
  },
  entry: {
    app: [
      require.resolve('../polyfills'),
      srcPathJoin('index'),
    ]
  },
  output: {
    path: config.PATH.public,
    filename: '[name].[chunkhash:10].js',
    chunkFilename: '[name].[chunkhash:10].js',
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(config.PATH.src, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      ...webpackDefaults.module.rules,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: appStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          allChunks: true,
        })
      },
      {
        test: /\.module\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }, {
          loader: "postcss-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.css$/,
        use: vendorStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
          allChunks: true,
        })
      },
    ]
  },
  plugins:[
    ...webpackDefaults.plugins,
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime",
    }),
    vendorStyle,
    appStyle,
    new OptimizeCssAssetsPlugin(),
    new NameAllModulesPlugin(),
    new WebpackMd5Hash(),
    new ManifestJsonPlugin(manifest),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new InlineChunkManifestHtmlWebpackPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      dropAsset: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      // dontCacheBustUrlsMatching: /\.\w{10}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      directoryIndex: 'index.html',
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.html$/],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      mangle: {
        except: ['webpackJsonp'],
        screw_ie8 : true,
        keep_fnames: true,
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'build_report.html',
      openAnalyzer: false,
    }),
  ]
};
