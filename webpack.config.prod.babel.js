import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: [
    './src/view/documents/main/index.js',
    './src/view/entries/index'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: 'bundle_[hash].js',
    publicPath: '/public/assets/js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/,   loaders: ['style!css'] },
      { test: /\.jsx?$/,  loaders: ['babel'], include: path.resolve(__dirname, 'src') }
    ]
  }
};