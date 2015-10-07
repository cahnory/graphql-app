import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: {
    bundle: [
      './src/view'
    ],
    common: [
      'react',
      'react-dom',
      'react-router',
      'history/lib/createBrowserHistory'
      //
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: '[name]_[hash].js',
    publicPath: '/assets/js'
  },
  module: {
    loaders: [
      { test: /\.(?:s[ac]|c)ss$/,   loaders: ['style', 'css?sourceMap', 'sass?sourceMap&outputStyle=expanded'] },
      { test: /\.jsx?$/,  loaders: ['babel'], include: path.resolve(__dirname, 'src') }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('common', '[name]_[hash].js')
  ]
};