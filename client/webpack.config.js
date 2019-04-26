const DotEnv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool:'source-map',
  resolve: {
    extensions: ['*','.ts','.tsx','.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new DotEnv(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
};