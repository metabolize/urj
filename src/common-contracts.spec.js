var c = require('rho-contracts-fork'),
  cc = require('./common-contracts'),
  _ = require('underscore')

var should = require('should')

// For convenience and conciseness.
var good = should.doesNotThrow
var bad = function(block) {
  should.throws(block, c.ContractError)
}

describe('s3Uri', function() {
  var goodUris = ['s3://foo/bar/baz', 's3://foo/bar', 's3://foo']

  var badUris = [
    'https://foo/bar/baz',
    's3://fiz:buzz@foo/bar/baz',
    's3://foo/bar/baz?bazinga',
    's3://foo/bar/baz#bazinga',
    'bogus',
    [],
    {},
    undefined,
    null,
  ]

  context('invoked with a good s3 uri', function() {
    it('does not raise a contract error', function() {
      _(goodUris).each(function(uri) {
        good(function() {
          cc.s3Uri.check(uri)
        })
      })
    })
  })

  context('invoked with a bad s3 uri', function() {
    it('raises a contract error', function() {
      _(badUris).each(function(uri) {
        bad(function() {
          cc.s3Uri.check(uri)
        })
      })
    })
  })
})
