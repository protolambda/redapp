var path = require('path');
var webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  target: 'web',
  devtool: false,
  entry: [
    path.join(__dirname, 'src', 'main'),
  ],
  resolve: {
    modules: [
      path.resolve('./node_modules')
    ]
  },
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /(node_modules\/)/,
      include: __dirname,
    }],
  },
};
