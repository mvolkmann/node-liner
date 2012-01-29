'use strict';
var fs = require('fs');

var NEWLINE = process.platform === 'win32' ? '\r\n' : '\n';
// could also split on this RegExp: /\r\n|\r|\n/

function fromStream(readStream, cb) {
  var leftover = '';
  readStream.on('data', function (buffer) {
    var lines = buffer.toString().split(NEWLINE);
    lines[0] = leftover + lines[0];
    leftover = lines.pop();
    lines.forEach(function (line) {
      cb(line);
    });
  });
}

function fromPath(filePath, bufferSize, cb) {
  if (!cb) {
    cb = bufferSize;
    bufferSize = 512;
  }
  var rs = fs.createReadStream(filePath, {bufferSize: bufferSize});
  fromStream(rs, cb);
}

exports.fromPath = fromPath;
exports.fromStream = fromStream;
