const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|xml)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(mp3|wav|mod)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, 'src/index.html'),
            to: path.resolve(__dirname, 'build'),
          },
          {
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'build/assets'),
          },
        ],
      },
    ),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};
