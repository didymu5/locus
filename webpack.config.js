var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      moment: 'moment/moment.js'
    },
    modulesDirectories: ['node_modules/']
  },
  plugins: [
    new CopyWebpackPlugin([{
          from: 'index.html',
          to: 'index.html'
        }])
  ]
};