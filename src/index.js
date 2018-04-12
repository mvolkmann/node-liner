'use strict';
const fs = require('fs');
const os = require('os');
const stream = require('stream');

/**
 * Constructs a Liner object.
 * Listen for "readable" events and
 * call the read method until it returns null.
 * @param source a string file path or a stream
 * @param bufferSize optional; used when source is a file path; defaults to 512
 */
class Liner extends stream.Transform {
  constructor(source, bufferSize) {
    // Using objectMode allows empty strings to pushed for blank lines.
    super({encoding: 'utf8', objectMode: true});

    const rs =
      typeof source === 'string'
        ? fs.createReadStream(source, {bufferSize: bufferSize || 512})
        : source;
    rs.on('error', err => this.emit('error', err));

    this.leftover = '';
    rs.pipe(this);
  }

  _transform(chunk, encoding, cb) {
    const lines = chunk.toString().split(os.EOL);
    lines[0] = this.leftover + lines[0];
    this.leftover = lines.pop();
    lines.forEach(line => this.push(line));
    cb();
  }
}

module.exports = Liner;
