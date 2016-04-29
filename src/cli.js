#!/usr/bin/env node

var Publisher = require('../src/publisher'),
    program = require('commander');

program
    .version('1.0')
    .arguments('<source> <target>')
    .action(function (source, target) {
        var publisher = new Publisher();
        publisher.publish(source, target, function (err) {
            if (err) {
                throw err;
            }
        });
    })
    .parse(process.argv);
