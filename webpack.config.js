const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index.js',
    library: {
      type: 'hxb',
      name: 'index',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: 'process/browser',
    }),
  ],
}
