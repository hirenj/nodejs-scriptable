'use strict';

import WebView from './js/WebView';
import Request from './js/Request';
import FileManager from './js/FileManager';

const QuickLook = {
  present: (filename) => {
    return new Promise (resolve => {
      // require('osx-quicklook')([filename], {interval: 2*1000 }, resolve);
      resolve();
    });
  }
};

const ShareSheet = {
  present: (filename) => {
    const spawn = require("child_process").spawn;
    spawn('open',['-a', 'Preview'].concat(filename));
    return Promise.resolve();
  }
};

const vm = require('vm');
const fs = require('fs');
const util = require('util');

const scriptfile = fs.readFileSync(process.argv[2]).toString();

const script = new vm.Script('(async () => {'+scriptfile+'})();');

let sandbox = {
  WebView: WebView,
  Request: Request,
  FileManager: FileManager,
  QuickLook: QuickLook,
  ShareSheet: ShareSheet,
  console: console,
  args: { all: process.argv.slice(3) }
};

(async () => {
  await script.runInNewContext(sandbox, {displayErrors: true });
  console.log('Done script');
  process.exit();
})();

