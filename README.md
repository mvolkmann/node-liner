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
