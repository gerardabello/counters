const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/index.js'
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: JSON.stringify(process.env.API_HOST)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Counters',
      template: './index.template.html'
    })
  ],
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      components: path.resolve('./components'),
      common: path.resolve('../common'),
      src: path.resolve('./src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    port: 4040,
    historyApiFallback: true
  }
}
