const path = require('path');
const config = require('../');
const srcPathJoin = require('../helpers').srcPathJoin;
const webpack = require('webpack');
const webpackDefaults = require('./webpack.default');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const host = 'localhost';

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      srcPathJoin('index'),
    ],
  },
  output: {
    path: config.PATH.public,
    filename: '[name].js',
    chunkFilename: '[name].js',
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(config.PATH.src, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  performance: {
    hints: false
  },
  devServer: {
    host,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false,
      modules: false,
    },
    overlay: {
      errors: true,
      warnings: false,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    contentBase: './public',
    historyApiFallback: true,
  },
  devtool: 'eval',
  module: {
    rules: [
      ...webpackDefaults.module.rules,
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'eslint-loader',
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["env", { modules: false }],
                "react",
                "stage-0"
              ],
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
        }, {
          loader: "postcss-loader"
        }, {
          loader: "sass-loader"
        }]
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
        use: [{
          loader: "style-loader",
        }, {
          loader: "css-loader",
        }]
      },
    ]
  },
  plugins:[
    ...webpackDefaults.plugins,
    new OpenBrowserPlugin({ url: `http://${host}:8080` }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
