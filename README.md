# node-lines

This is a simple Node.js module for reading lines from files and streams.
There are other similar modules, but I beleive they are
more complicated than they need to be.

## Example

var lines = require('lines');

lines.fromPath('./story.txt', function (err, line) {
  if (err) {
    console.error(err);
  } else if (line === null) {
    console.log('EOF');
  } else {
    console.log(line);
  }
});
