# node-liner

[![Build Status](https://secure.travis-ci.org/mvolkmann/node-liner.png)](http://travis-ci.org/mvolkmann/node-liner)

This is a simple Node.js module that reads lines from files and streams.
There are other similar modules, but I believe
they are more complicated than they need to be.

## Example

    const Liner = require('liner');
    const liner = new Liner('./story.txt');

    liner.on('readable', () => {
      while (true) {
        const line = liner.read();
        if (line === null) break;
        // Do something with line.
        console.log(line);
      }
    });

    liner.on('error', err => console.error(err));

    liner.on('end', () => process.exit(0));

### Installing

To install this, run `npm install --save liner`.

While this module is implemented using ES6 features,
it uses a `prepublish` script to transpile the code to ES5.
This is done using Babel and happens when the package is installed.
Rather than installing the `src` directory that is present in this repo,
it installs a `lib` directory containing a transpiled version of the code.
The file `.npmignore` is critical in getting this to work properly.
