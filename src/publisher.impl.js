'use strict'

const childProcess = require('child_process'),
  async = require('async'),
  compress = require('./compress'),
  _ = require('underscore')

const execWithInheritedStdio = function (command, callback) {
  const child = childProcess.spawn(command, { shell: true, stdio: 'inherit' })

  // Guard against invoking the callback more than once.
  // https://nodejs.org/api/child_process.html#child_process_event_error
  let done = false

  child.on('error', function (err) {
    if (!done) {
      callback(err)
      done = true
    }
  })

  child.on('exit', function (code, signal) {
    if (!done) {
      if (code === 0) {
        callback(null)
      } else {
        callback(Error(code))
      }
      done = true
    }
  })
}

const Publisher = function (options) {
  options = options || {}
  this.compress = options.compress === undefined ? true : options.compress
  this.noClobber = Boolean(options.noClobber)
}

Publisher.prototype.publish = function (srcPath, dstPath, doneCallback) {
  const publisher = this

  const fns = []

  if (this.noClobber) {
    fns.push(function (callback) {
      // List all keys that contain dstPath. If any are found, then dstPath exists
      // and we don't want to publish.
      const command = `s3 ls ${dstPath}`

      childProcess.exec(command, {}, function (err, stdout) {
        if (err) {
          callback(err)
        } else if (stdout.indexOf(dstPath) !== -1) {
          callback(new Error(`The path "${dstPath}" already exists.`))
        } else {
          callback()
        }
      })
    })
  }

  if (this.compress) {
    fns.push(_(compress).partial(srcPath))
  } else {
    fns.push(function (callback) {
      callback(null, srcPath)
    })
  }

  fns.push(function (tmpPath, callback) {
    const command = [
      's3 sync',
      '--guess-content-type',
      '--no-encrypt',
      '--policy public-read',
      '--progress',
    ]
      .concat(publisher.compress ? ['--encoding gzip'] : [])
      .concat([tmpPath, dstPath])
      .join(' ')

    execWithInheritedStdio(command, callback)
  })

  async.waterfall(fns, function (err) {
    // Discard other arguments.
    doneCallback(err)
  })
}

module.exports = Publisher
