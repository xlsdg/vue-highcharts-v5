var path = require('path')
var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    'vue-highcharts': ['./src/HighCharts.js'],
    'vue-highstock': ['./src/HighStock.js'],
    'vue-highmaps': ['./src/HighMaps.js']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: undefined,
    libraryTarget: 'umd'
    // umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue',
    },
    'highcharts/highmaps': {
      root: 'Highcharts',
      commonjs2: 'highcharts/highmaps',
      commonjs: 'highcharts/highmaps',
      amd: 'highcharts/highmaps'
    },
    'highcharts/highstock': {
      root: 'Highcharts',
      commonjs2: 'highcharts/highstock',
      commonjs: 'highcharts/highstock',
      amd: 'highcharts/highstock'
    },
    highcharts: {
      root: 'Highcharts',
      commonjs2: 'highcharts',
      commonjs: 'highcharts',
      amd: 'highcharts',
    }
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ],
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
};
