#!/usr/bin/env node

'use strict'

const Publisher = require('../src/publisher'),
  program = require('commander')

program
  .version('1.1')
  .arguments('<source> <target>')
  .option('-n, --no-clobber', 'Do not overwrite any existing release')
  .action(function(source, target) {
    const publisher = new Publisher({ noClobber: program.noClobber })
    publisher.publish(source, target, function(err) {
      if (err) {
        throw err
      }
    })
  })
  .parse(process.argv)
