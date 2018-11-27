var temp = require('temp'),
  zlib = require('zlib'),
  async = require('async'),
  ncp = require('ncp').ncp,
  _ = require('underscore')

var streamGzip = function(read, write) {
  var gzip = zlib.createGzip({
    level: zlib.Z_BEST_COMPRESSION,
  })
  read.pipe(gzip).pipe(write)
}

var compress = function(srcPath, doneCallback) {
  var makeTempDir = _(temp.mkdir).partial('compressed')

  var copyAndCompress = function(tempDirPath, callback) {
    ncp(
      srcPath,
      tempDirPath,
      {
        clobber: false,
        dereference: true,
        stopOnErr: true,
        transform: streamGzip,
      },
      function(err) {
        if (err) {
          // With stopOnErr: true, we should get only one error.
          callback(err[0])
        } else {
          callback(null, tempDirPath)
        }
      }
    )
  }

  async.waterfall([makeTempDir, copyAndCompress], doneCallback)
}

module.exports = compress
