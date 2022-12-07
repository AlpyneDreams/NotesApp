const rules = require('./webpack.rules')
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

rules.push(
  {
    test: /\.pug$/,
    loader: 'pug-loader',
  },
  {
    test: /\.m?js$/,
    exclude: [/(node_modules|bower_components)/],
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
        plugins: [
          'transform-react-pug',
          ['react-refresh/babel', {skipEnvCheck: true}]
        ]
      }
    }
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
    loader: 'file-loader'
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.css$/,
    use: [
      'extract-loader',
      {
        loader: "css-loader",
        options: {
          esModule: false,
        }
      }
    ],
    type: 'asset/resource'
  },
)

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],

  // transform-react-pug can cause broken source maps
  devtool: false
}
