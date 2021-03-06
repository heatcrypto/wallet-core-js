const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  experiments: { asyncWebAssembly: true, importAsync: true },
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'node.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [
    // fimk-sdk + heat-sdk use bufferutils which uses this as an optional dependency
    'memcpy'
  ]
};