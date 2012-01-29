# node-lines

This is a simple module for reading lines from files and streams.
There are other similar modules, but I beleive they are
more complicated than they need to be.

## Example

var lines = require('lines');

lines.fromPath('./story.txt', function (line) {
  console.log(line);
});
