'use strict';
var fs = require('fs');
var os = require('os');
var Stream = require('stream');
var util = require('util');

/**
 * @param source a string file path or a stream
 */
function Liner(source, bufferSize) {
  Stream.call(this);

  if (typeof source === 'string') {
    this.fromPath(source, bufferSize);
  } else {
    this.fromStream(source);
  }
}
util.inherits(Liner, Stream);

/**
 * Reads lines from a given file path.
 * @param filePath the file path
 * @param bufferSize the buffer size used to read the file
 *   (optional; defaults to 512)
 */
Liner.prototype.fromPath = function (filePath, bufferSize) {
  bufferSize = bufferSize || 512;
  var rs = fs.createReadStream(filePath, {bufferSize: bufferSize});
  this.fromStream(rs);
};

/**
 * Reads lines from a given ReadStream.
 * @param readStream the ReadStream
 */
Liner.prototype.fromStream = function (readStream) {
  var leftover = '';
  var that = this;

  readStream.on('data', function (buffer) {
    var lines = buffer.toString().split(os.EOL);
    lines[0] = leftover + lines[0];
    leftover = lines.pop();
    lines.forEach(function (line) {
      that.emit('data', line);
    });
  });

  readStream.on('end', function () {
    if (leftover.length > 0) {
      that.emit('data', leftover);
    }
  });

  readStream.on('error', function (err) {
    that.emit('error', err);
  });

  readStream.on('close', function (err) {
    that.emit('end');
  });
};

module.exports = Liner;
