import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: {
    app: [
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
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: 'bundle_[hash].js',
    publicPath: '/assets/js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin("common", "common.js")
  ],
  module: {
    loaders: [
      { test: /\.css$/,   loaders: ['style!css'] },
      { test: /\.jsx?$/,  loaders: ['babel'], include: path.resolve(__dirname, 'src') }
    ]
  }
};