const fs = require('fs');
const path = require('path');
const os = require('os');

export default class FileManager {
  static local() {
    return {
      write: (filepath,content) => {
        fs.writeFileSync(filepath,content);
      },
      joinPath: (patha,pathb) => {
        return path.join(patha,pathb);
      },
      temporaryDirectory: () => {
        return os.tmpdir();
      }
    }
  }
}