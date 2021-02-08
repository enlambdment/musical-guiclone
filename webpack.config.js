const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); // to access built-in plugins
const path = require('path'); // file path utilities

module.exports = {
  // which start file(s) to build the dep graph from
  entry: {
    main: './src/index.js'
  },
  // where webpack should create the bundle(s) and what to call them.
  output: {
    filename: 'main.js',
    // obtain an absolute path for where to place the created bundle 
    // by prepending val. of __dirname to 'dist'
    path: path.resolve(__dirname, 'dist')
  },
  // tell webpack how to transform files other than JS files - e.g. here, CSS files
  module: {
    rules: [
      { test: /.css$/, use: "css-loader",
        include: __dirname + '/src' }
    ]
  },
  // using html-webpack-plugin, let's generate a new html
  // templating off of the ones from views, and inject the
  // webpack-generated bundle into there
  plugins: [
    new HtmlWebpackPlugin({template: './views/index.html'})
  ]
};