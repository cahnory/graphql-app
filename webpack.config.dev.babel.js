import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: {
    bundle: [
      './src/view',
      './src/view/styles/index.scss'
    ],
    common: [
      'react',
      'react-dom',
      'react-router',
      'react-relay',
      'react-router-relay',
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
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loaders: [
          'style',
          'css',
          'pleeease',
          'sass?includePaths[]=src/view/styles'
        ]
      },
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot',
          'babel?plugins[]=' + path.join(__dirname, 'webpack.graphql.js')
        ],
        include: path.resolve(__dirname, 'src') }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("common", "[name].js")
  ]
};