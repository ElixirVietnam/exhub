const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.join(__dirname, '../'),

  entry: {
    main: './app/main.js',

    vendors: [
      'jquery',
      'lodash',
      'moment',
      'react',
      'react-dom',
      'bootstrap',
    ],
  },

  output: {
    path: './priv/static',
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js',
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx'],
    alias: {
      'react/lib/Object.assign': 'object-assign', // temporary fix for missing require in `react-ga`
      'assets': './assets',
    },
  },

  module: {
    noParse: [],
    loaders: [{
      test: /\.(js|jsx)?$/,
      loader: process.env.NODE_ENV === 'production'
        ? 'babel-loader?cacheDirectory'
        : 'react-hot!babel-loader?cacheDirectory',
      exclude: /(?:node_modules)|(?:vendor)/,
    }, {
      include: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?limit=8192&name=images/assets.[ext]',
    }, {
      test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?limit=8192&name=fonts/assets.[ext]',
    }],
  },

  plugins: [
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000,
    }),
  ],
};

module.exports = config;
