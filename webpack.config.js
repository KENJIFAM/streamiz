const DotEnv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: './bundle.js'
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
      }
    ]
  },
  plugins: [
    new DotEnv(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
}