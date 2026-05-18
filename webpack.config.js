const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'ios-button-card': './custom-button-card.js',
    'ios-button-card-editor': './custom-button-card-editor.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname),
    compress: true,
    port: 8080,
  },
  devtool: 'source-map',
};
