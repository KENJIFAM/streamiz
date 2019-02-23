const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: ['webpack/hot/poll?100', './server/server.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DotEnv()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  node: {
    __dirname: false,
    __filename: false
  }
};