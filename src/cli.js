#!/usr/bin/env node

var Publisher = require('../src/publisher'),
    program = require('commander');

program
    .version('1.0')
    .arguments('<source> <target>')
    .option('-n, --no-clobber', 'Do not overwrite any existing release')
    .action(function (source, target) {
        var publisher = new Publisher({ noClobber: program.noClobber });
        publisher.publish(source, target, function (err) {
            if (err) {
                throw err;
            }
        });
    })
    .parse(process.argv);
