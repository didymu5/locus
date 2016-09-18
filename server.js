const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  path: config.output.path,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}).listen(3000, 'localhost', (err) => {
  if (err) { console.error(err); }
  console.log('Listening at http://localhost:3000/');
});