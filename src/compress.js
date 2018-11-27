var c = require('rho-contracts-fork'),
  cc = require('./common-contracts')

// Recursively compress a directory into a temporary folder, using gzip.
var compress = c
  .fun(
    { srcPath: c.string },
    {
      callback: cc.callback(
        // The path to a temporary directory containing the compressed files.
        { dstPath: c.string }
      ),
    }
  )
  .wrap(require('./compress.impl'))

module.exports = compress
