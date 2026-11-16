// Rebuilds the checklist PDFs in public/downloads from the HTML next to this file.
// Needs Playwright (npm i -D playwright). Run: node scripts/checklist/build.cjs
const path = require('node:path');
const { chromium } = require('playwright');

const EDITIONS = [
  { html: 'mens-health-mot-checklist.html', pdf: 'mens-health-mot-checklist.pdf', format: 'A4' }, // UK
  { html: 'mens-health-checklist-us.html', pdf: 'mens-health-checklist-us.pdf', format: 'Letter' }, // US
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const e of EDITIONS) {
    const out = path.join(__dirname, '..', '..', 'public', 'downloads', e.pdf);
    await page.goto('file://' + path.join(__dirname, e.html));
    await page.pdf({ path: out, format: e.format, printBackground: true, preferCSSPageSize: true });
    console.log('Wrote ' + out);
  }
  await browser.close();
})();
