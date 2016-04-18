var c = require('rho-contracts'),
    _ = require('underscore');

var cc = _(require('./common-contracts')).clone();

cc.publisherOptions = c.toContract({
    compress: c.optional(c.bool),
}).rename('publisherOptions');

// Publish some files to S3.
cc.Publisher = c.fun(
    { options: c.optional(cc.publisherOptions) }
).constructs({
    publish: c.fun(
        { srcPath: c.string },
        { dstPath: cc.s3Uri },
        { callback: cc.callback() }
    ),
});

module.exports = cc.Publisher.wrap(require('./publisher.impl'));
