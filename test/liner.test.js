'use strict';
var liner = require('../lib/liner.js');

exports.testFromPath = function (t) {
  var lines = [];
  liner.fromPath('../story.txt', function (err, line) {
    if (err) {
      t.ok(false, err);
    } else if (line === null) {
      var len = lines.length;
      t.ok(len === 25, 'number of lines read');
      t.ok(lines[0] ===
        'Come and listen to a story about a man named Jed',
        'first line');
      t.ok(lines[len - 1] === "Y'all come back now, y'hear?.",
        'last line');
      t.done();
    } else {
      lines.push(line);
    }
  });
};
