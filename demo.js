'use strict';
const Liner = require('index.js');

const liner = new Liner('story.txt');

liner.on('readable', () => {
  while (true) {
    const line = liner.read();
    if (line === null) break;
    console.log(line);
  }
});

liner.on('error', err => console.error(err));

liner.on('end', () => process.exit(0));
