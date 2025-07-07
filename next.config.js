// next.config.js
const webpack = require('webpack')

module.exports = {
  webpack: config => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      util: require.resolve('util'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser.js'),
      url: require.resolve('url'),
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer'),
      process: require.resolve('process/browser.js')
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js'
      })
    )

    return config
  }
}
