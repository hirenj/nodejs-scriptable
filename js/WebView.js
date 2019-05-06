const puppeteer = require('puppeteer-core');

const CHROME_PATH = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';

export default class WebView {
  constructor() {
  }
  async ensurePage() {
    if ( ! this.browser && ! this.page ) {
      this.browser = await puppeteer.launch({executablePath: CHROME_PATH });
      this.page = await this.browser.newPage();
    }
  }
  async evaluateJavaScript(script) {
    await this.ensurePage();
    return this.page.evaluate(script);
  }
  async loadHTML(html) {
    await this.ensurePage();
    return this.page.setContent(html);
  }
}