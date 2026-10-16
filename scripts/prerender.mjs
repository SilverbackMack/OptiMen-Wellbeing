// Runs after `vite build`. Writes a real HTML page for every page, article and
// review (so Google can read them and links can be shared), plus sitemap.xml
// and robots.txt. The React app takes over once it loads in the browser.
import { createServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

const server = await createServer({
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { ARTICLES, PRODUCT_REVIEWS, PILLARS } = await server.ssrLoadModule('/src/data/content.ts');
  const { PAGE_PATHS, PAGE_META, SITE_URL, SITE_NAME, articlePath, reviewPath } =
    await server.ssrLoadModule('/src/seo.ts');

  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const today = new Date().toISOString().slice(0, 10);

  const esc = (s = '') =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const wrap = 'style="max-width:760px;margin:0 auto;padding:48px 16px;font-family:sans-serif;line-height:1.6;color:#0F172A"';
  const nav = `<nav><a href="/">Home</a> · <a href="/health">Men's Health</a> · <a href="/fitness">Fitness</a> · <a href="/nutrition">Nutrition</a> · <a href="/sleep">Sleep</a> · <a href="/mindset">Mindset</a> · <a href="/reviews">Reviews</a> · <a href="/about">About</a> · <a href="/contact">Contact</a></nav>`;
  const list = (items = []) => (items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '');
  const sections = (secs = []) =>
    secs.map((s) => `<h2>${esc(s.heading)}</h2>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}${list(s.bullets)}`).join('');
  const sponsoredLink = (url, label) =>
    `<p><a href="${esc(url)}" rel="sponsored noopener noreferrer" target="_blank">${esc(label)}</a> (affiliate link)</p>`;

  const pages = [];
  const add = (urlPath, title, description, body, jsonLd) => pages.push({ urlPath, title, description, body, jsonLd });

  // Section pages
  for (const [page, p] of Object.entries(PAGE_PATHS)) {
    const meta = PAGE_META[page];
    let body = `<h1>${esc(meta.title.split(' | ')[0])}</h1><p>${esc(meta.description)}</p>`;
    const pillar = PILLARS[page];
    if (pillar) body = `<h1>${esc(pillar.name)}</h1><p>${esc(pillar.description)}</p>`;
    const arts = page === 'home' ? ARTICLES : ARTICLES.filter((a) => a.pillar === page);
    if (arts.length) body += `<h2>Articles</h2><ul>${arts.map((a) => `<li><a href="${articlePath(a.id)}">${esc(a.title)}</a> — ${esc(a.summary)}</li>`).join('')}</ul>`;
    if (page === 'reviews' || page === 'home')
      body += `<h2>Reviews</h2><ul>${PRODUCT_REVIEWS.map((r) => `<li><a href="${reviewPath(r.id)}">${esc(r.name)}</a> — ${esc(r.verdict)}</li>`).join('')}</ul>`;
    add(p, meta.title, meta.description, body);
  }

  // Articles
  for (const a of ARTICLES) {
    const title = a.metaTitle ?? `${a.title} | ${SITE_NAME}`;
    const description = a.metaDescription ?? a.summary;
    let body = `<article><p><a href="/${a.pillar}">${esc(a.pillarLabel)}</a> · ${esc(a.readTime)} · ${esc(a.publishedDate)}</p>`;
    body += `<h1>${esc(a.title)}</h1><p>${esc(a.summary)}</p><p>By ${esc(a.author.name)}, ${esc(a.author.role)}</p>`;
    body += sections(a.sections);
    body += `<h2>Key takeaways</h2>${list(a.keyTakeaways)}<h2>What to do next</h2>${list(a.protocolSteps)}`;
    if (a.affiliateCta) body += sponsoredLink(a.affiliateCta.url, a.affiliateCta.label);
    body += `<h2>References</h2>${list(a.references)}</article>`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description,
      author: { '@type': 'Organization', name: a.author.name },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: SITE_URL + articlePath(a.id),
    };
    add(articlePath(a.id), title, description, body, jsonLd);
  }

  // Reviews
  for (const r of PRODUCT_REVIEWS) {
    const title = `${r.name} Review | ${SITE_NAME}`;
    let body = `<article><p><a href="/reviews">Reviews</a> · ${esc(r.category)}</p><h1>${esc(r.name)} Review</h1>`;
    body += `<p>Score: ${esc(r.overallScore)} out of 10 · Price: ${esc(r.priceRange)}</p><p>${esc(r.verdict)}</p>`;
    body += `<h2>Who it's for</h2><p>${esc(r.whoItIsFor)}</p><h2>Pros</h2>${list(r.pros)}<h2>Cons</h2>${list(r.cons)}`;
    body += `<h2>Specifications</h2>${list(r.specs.map((s) => `${s.label}: ${s.value}`))}`;
    body += sections(r.sections);
    if (r.affiliateUrl) body += sponsoredLink(r.affiliateUrl, `View on ${r.affiliateStore ?? 'Amazon'}`);
    if (r.affiliateNote) body += `<p>${esc(r.affiliateNote)}</p>`;
    body += '</article>';
    add(reviewPath(r.id), title, r.verdict, body);
  }

  for (const pg of pages) {
    const url = SITE_URL + (pg.urlPath === '/' ? '/' : pg.urlPath);
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(pg.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(pg.description)}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(pg.title)}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(pg.description)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
      .replace('<div id="root"></div>', `<div id="root"><div ${wrap}>${nav}${pg.body}</div></div>`);
    html = html.replace('</head>', `    <meta property="og:url" content="${url}" />\n  </head>`);
    if (pg.jsonLd) html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(pg.jsonLd).replace(/</g, '\\u003c')}</script>\n  </head>`);
    const out = pg.urlPath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, pg.urlPath, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((pg) => `  <url><loc>${SITE_URL}${pg.urlPath}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

  // Keep the 404 fallback as the plain app shell so unknown links still load the site
  fs.writeFileSync(path.join(DIST, '404.html'), template);

  console.log(`Prerendered ${pages.length} pages, sitemap.xml and robots.txt`);
} finally {
  await server.close();
}
