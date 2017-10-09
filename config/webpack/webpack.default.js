const config = require('../');
const srcPathJoin = require('../helpers').srcPathJoin;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackDefaults = {
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=images/[name].[ext]'
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module){
        return isExternal(module)
      },
    }),
    new HtmlWebpackPlugin({
      title: config.APP_NAME,
      filename: 'index.html',
      favicon: srcPathJoin('assets/favicon.ico'),
      template: srcPathJoin('index.ejs'),
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.ENV),
      'process.env.API_DOMAIN': JSON.stringify(config.API_DOMAIN),
      'PUBLIC_URL': '',
    }),
  ]
};

module.exports = webpackDefaults;

function isExternal(module) {

  const {
    context,
  } = module;

  if (typeof context !== 'string') {
    return false;
  }

  const isNodeModule = context.indexOf('node_modules') > -1;
  const isLoader = context.indexOf('-loader') > -1;

  return isNodeModule && !isLoader;
}