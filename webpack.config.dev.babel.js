import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: {
    app: [
      './src/view'
    ],
    common: [
      'react',
      'react-dom',
      'react-router',
      'history/lib/createBrowserHistory',
      'webpack-hot-middleware/client'
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: 'bundle.js',
    publicPath: '/assets/js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("common", "common.js")
  ],
  module: {
    loaders: [
      { test: /\.css$/,   loaders: ['style!css'] },
      { test: /\.jsx?$/,  loaders: ['react-hot', 'babel'], include: path.resolve(__dirname, 'src') }
    ]
  }
};