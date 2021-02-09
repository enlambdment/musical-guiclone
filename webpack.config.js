const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); // to access built-in plugins
const path = require('path'); // file path utilities

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /.css$/, use: "style-loader!css-loader",
        include: __dirname + '/src' 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './views/index.html'})
  ]
};