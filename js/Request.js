const https = require('https');
const redirect_https = require('follow-redirects').https;
const URL = require('url').URL;

class HTTPError extends Error{
  constructor(message,status) {
    super(message);
    this.status = status;
  }
};

export default class Request {
  constructor(url) {
    this.url = new URL(url);
  }
  async load() {
    const options = {
      hostname: this.url.host,
      port: 443,
      path: this.url.pathname + (this.url.search ? this.url.search : ''),
      method: this.method || 'GET',
      headers: this.headers || {}
    }

    let result = new Promise( (resolve,reject) => {
      let results = [];
      const https_module = this.onRedirect ? redirect_https : https;
      const req = https_module.request(options, (res) => {
        res.on('data', (d) => {
          results.push(d);
        });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            let errmessage = Buffer.concat(results);
            if (errmessage.length === 0 && res.statusCode === 500) {
              errmessage = 'Server Error';
            }
            reject(new HTTPError(errmessage,res.statusCode));
            return;
          }
          resolve(Buffer.concat(results))
        });
      });

      req.on('error', reject);

      if (this.body) {
        req.write(this.body);
      }

      req.end();
    });
    return result;
  }
  async loadString() {
    return this.load().then( body => {
      return body.toString();
    });
  }
  async loadJSON() {
    return this.loadString().then( body => {
      return JSON.parse(body);
    });
  }

}