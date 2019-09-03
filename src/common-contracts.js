'use strict'

const c = require('rho-contracts-fork'),
  s3Uri = require('rho-cc-s3-uri')

const cc = (module.exports = {})

cc.callback = require('rho-cc-node-style-callback').withDefaultError(c.error)

cc.s3Uri = s3Uri
