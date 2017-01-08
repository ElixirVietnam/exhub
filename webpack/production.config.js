const _                 = require('lodash');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig  = require('./default.config');

_.merge(productionConfig, {
    devtool: false,

    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js',
    },

    postcss(wp) {
        return [
            require('postcss-import')({ addDependencyTo: wp }),
            require('postcss-url')(),
            require('postcss-cssnext')(),
            require('cssnano')({ autoprefixer: false }),
        ];
    },

}, (obj1, obj2) => {
    return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});

productionConfig.module.loaders.push(
    {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!less'),
    }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
    }
);

productionConfig.plugins.push(
    new ExtractTextPlugin('css/style.css', {
        allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
        '__DEV__'   : false,
        '__STAGE__' : false,
        '__PROD__'  : true,
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: false,
        mangle: true,
        minimize: true,
    })
);

module.exports = productionConfig;
