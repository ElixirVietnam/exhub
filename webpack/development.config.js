const _                 = require('lodash');
const path              = require('path');
const webpack           = require('webpack');
const developmentConfig = require('./default.config');

const sassLoaders = [
  'style-loader',
  'css-loader',
  'postcss-loader',
  'sass-loader?outputStyle=expanded',
];

const lessLoaders = [
  'style-loader',
  'css-loader',
  'postcss-loader',
  'less-loader?outputStyle=expanded',
]

const cssLoaders = [
  'style',
  'css?module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader',
];

_.merge(developmentConfig, {
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      './app/main.js',
    ],
  },

  output: {
    publicPath: 'http://localhost:8080/assets/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },

  cache: true,
  debug: true,
  outputPathinfo: true,
  devtool: 'source-map',
  //devtool: false,
  devServer: {
    host: 'localhost',
    contentBase: path.join(__dirname, '../', '../'),
    historyApiFallback: true,
    inline: true,
    noInfo: true,
    quite: true,
    cache: true,
    hot: true,
  },

  postcss(wp) {
    return [
      require('postcss-import')({ addDependencyTo: wp }),
      require('postcss-url')(),
      require('postcss-cssnext')(),
    ];
  },
}, (obj1, obj2) => (
  _.isArray(obj2) ? obj2.concat(obj1) : undefined
));

developmentConfig.module.loaders.push(
  {
    test: /\.less/,
    loader: lessLoaders.join('!'),
  }, {
    test: /\.scss$/,
    loader: sassLoaders.join('!'),
  }, {
    test: /\.css$/,
    loader: cssLoaders.join('!'),
  }
);

developmentConfig.plugins.push(
  new webpack.OldWatchingPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(), // Hot Module Replacement
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    filename: 'js/vendors.js',
    minChunks: Infinity,
  }),
  new webpack.DefinePlugin({
    __DEV__   : true,
    __STAGE__ : false,
    __PROD__  : false,
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  })
);

module.exports = developmentConfig;
