'use strict';
var liner = require('../lib/liner.js');

exports.testFromPath = function (t) {
  var lines = [];
  liner.fromPath('../story.txt', function (err, line) {
    if (err) {
      t.ifError(err);
    } else if (line === null) {
      var len = lines.length;
      t.equal(len, 25, 'number of lines read');
      t.equal(lines[0],
        'Come and listen to a story about a man named Jed',
        'first line');
      t.equal(lines[len - 1], "Y'all come back now, y'hear?.",
        'last line');
      t.done();
    } else {
      lines.push(line);
    }
  });
};
