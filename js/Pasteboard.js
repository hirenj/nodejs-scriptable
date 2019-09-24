const fs = require('fs');
const path = require('path');
const os = require('os');

const pbcopy = function pbcopy(data) {
  return new Promise(function(resolve, reject) {
    const proc = require('child_process').spawn('pbcopy');
    proc.on('error', function(err) {
      reject(err);
    });
    proc.on('close', function(err) {
      resolve();
    });
    proc.stdin.write(data);
    proc.stdin.end();
  })
};

export default class Pasteboard {
  static copyString(string) {
    return pbcopy(string);
  }
}