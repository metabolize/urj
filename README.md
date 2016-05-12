urj
===

Static web publishing using S3. Like [surge][], but without the syrup.

[surge]: http://surge.sh/


Features
--------

- Installs and configures easily
- Uses your own S3 account
- Compresses with `gzip`
- Sets `public-read`
- Supports OS X and Linux
- Requires Python 2.7 and [baiji][]
- Can be used via a CLI or as a NodeJS library

[baiji]: https://github.com/bodylabs/baiji


Installation
------------

1. Install Python 2.7
2. `npm install urj`
3. `baiji` will be installed for you, via `pip`.
4. Set your AWS credentials in `~/.aws/credentials`, if they're not already
   there.


Contribute
----------

- Issue Tracker: github.com/bodylabs/urj/issues
- Source Code: github.com/bodylabs/urj

Pull requests welcome!


Support
-------

If you are having issues, please let us know.


License
-------

The project is licensed under the two-clause BSD license.
