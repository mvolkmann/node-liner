'use strict';
var lines = require('../lib/lines');

/*
lines.fromPath('./story.txt', function (line) {
  console.log(line);
});
*/
lines.fromPath('./story.txt', console.log);
