'use strict';
var Liner = require('../index.js');

function compareLines(t, lines) {
  var len = lines.length;
  t.equal(len, 25, 'number of lines read');
  t.equal(lines[0],
    'Come and listen to a story about a man named Jed',
    'first line');
  t.equal(lines[len - 1], "Y'all come back now, y'hear?.",
    'last line');
  t.done();
}

function testIt(t) {
  var lines = [];
  var liner = new Liner('../story.txt');
  liner.on('data', lines.push.bind(lines));
  liner.on('error', t.ifError);
  liner.on('end', compareLines.bind(null, t, lines));
};

exports.testIt = testIt;
