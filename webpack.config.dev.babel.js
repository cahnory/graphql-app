import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'eval',
  entry: {
    bundle: [
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
    filename: '[name].js',
    publicPath: '/assets/js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("common", "[name].js"),
    new ExtractTextPlugin('public/assets/css/[name]_[contenthash].css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      { test: /\.s?css$/,   loaders: ['style', 'css'] },
      { test: /\.jsx?$/,  loaders: ['react-hot', 'babel'], include: path.resolve(__dirname, 'src') }
    ]
  }
};