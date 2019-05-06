#! /usr/bin/env node

const fs = require('fs');
const os = require('os');

const script = process.argv[2];

const script_home = '~/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents'.replace(/^~/, os.homedir());

fs.readdirSync(script_home).forEach(file => {
  if ( `${script}.js` === file ) {
    process.argv[2] = `${script_home}/${file}`;
  }
});

require('..');

