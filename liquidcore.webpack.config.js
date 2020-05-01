const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/liquidcore.js',
  target: 'node',
  experiments: { asyncWebAssembly: true, importAsync: true },
  optimization: {
    minimize: true,
  },
  output: {
    filename: 'liquidcore.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [
    // fimk-sdk + heat-sdk use bufferutils which uses this as an optional dependency
    'memcpy'
  ]
};