'use strict';
var lines = require('../lib/lines');

lines.fromPath('./story.txt', function (err, line) {
  if (err) {
    console.error(err);
  } else if (line === null) {
    console.log('EOF');
  } else {
    console.log(line);
  }
});
