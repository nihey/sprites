var webpack = require('webpack');

module.exports = {
  entry: './js/sprite.js',
  output: {
    path: './dist/',
    filename: 'sprite.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
};
