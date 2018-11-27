'use strict'

const c = require('rho-contracts-fork'),
  s3BucketName = require('rho-cc-s3-bucket-name'),
  url = require('url'),
  _ = require('underscore')

const cc = (module.exports = {})

cc.callback = require('rho-cc-node-style-callback').withDefaultError(c.error)

cc.s3Uri = c
  .pred(function(value) {
    if (!_(value).isString()) {
      return false
    }

    const parsed = url.parse(value)

    const disallowedKeys = ['auth', 'port', 'search', 'query', 'hash']
    const isPresent = function(key) {
      return parsed[key] !== null
    }
    if (_(disallowedKeys).any(isPresent)) {
      return false
    }

    if (parsed.protocol !== 's3:') {
      return false
    }

    try {
      s3BucketName.check(parsed.host)
    } catch (e) {
      return false
    }

    return true
  })
  .rename('s3Uri')
