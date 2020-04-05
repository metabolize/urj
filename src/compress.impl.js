'use strict'

const temp = require('temp'),
  zlib = require('zlib'),
  async = require('async'),
  ncp = require('ncp').ncp,
  _ = require('underscore')

const streamGzip = function (read, write) {
  const gzip = zlib.createGzip({
    level: zlib.Z_BEST_COMPRESSION,
  })
  read.pipe(gzip).pipe(write)
}

const compress = function (srcPath, doneCallback) {
  const makeTempDir = _(temp.mkdir).partial('compressed')

  const copyAndCompress = function (tempDirPath, callback) {
    ncp(
      srcPath,
      tempDirPath,
      {
        clobber: false,
        dereference: true,
        stopOnErr: true,
        transform: streamGzip,
      },
      function (err) {
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
