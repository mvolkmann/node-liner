'use strict';
const Liner = require('../lib/index.js');

function compareLines(t, lines) {
  const len = lines.length;
  t.equal(len, 25, 'number of lines read');
  t.equal(lines[0],
    'Come and listen to a story about a man named Jed',
    'first line');
  t.equal(lines[len - 1], "Y'all come back now, y'hear?.",
    'last line');
  t.done();
}

function testIt(t) {
  const lines = [];
  const liner = new Liner('../story.txt');

  liner.on('readable', () => {
    while (true) {
      const line = liner.read();
      if (line === null) break;
      lines.push(line);
    }
  });

  liner.on('error', t.ifError);
  liner.on('end', () => compareLines(t, lines));
}

exports.testIt = testIt;
