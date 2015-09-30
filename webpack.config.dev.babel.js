import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/view/entries/index'
  ],
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
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.css$/,   loaders: ['style!css'] },
      { test: /\.jsx?$/,  loaders: ['react-hot', 'babel'], include: path.resolve(__dirname, 'src') }
    ]
  }
};