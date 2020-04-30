const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  experiments: { asyncWebAssembly: true, importAsync: true },
  optimization: {
    minimize: true,
  },
  output: {
    filename: 'node.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};