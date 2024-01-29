const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/umd/'),
    filename: 'hexabase.js',
    library: {
      type: 'umd',
      name: 'hexabase',
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
    fallback: { "buffer": false },
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: 'process/browser',
    }),
  ],
}
