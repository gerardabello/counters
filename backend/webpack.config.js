const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: {
    bundle: ['./src/server.js']
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      common: path.resolve('../common'),
      src: path.resolve('./src'),
      'pg-native': path.join(__dirname, 'aliases/pg-native.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
