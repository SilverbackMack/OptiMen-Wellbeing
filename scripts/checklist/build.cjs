// Rebuilds public/downloads/mens-health-mot-checklist.pdf from the HTML next to this file.
// Needs Playwright (npm i -D playwright). Run: node scripts/checklist/build.cjs
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const src = path.join(__dirname, 'mens-health-mot-checklist.html');
  const out = path.join(__dirname, '..', '..', 'public', 'downloads', 'mens-health-mot-checklist.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + src);
  await page.pdf({ path: out, format: 'A4', printBackground: true });
  await browser.close();
  console.log('Wrote ' + out);
})();
