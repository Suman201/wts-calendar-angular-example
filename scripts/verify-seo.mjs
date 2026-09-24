import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const productionUrl = 'https://wts-calendar.github.io/';
const expectedTitle = 'Angular Calendar Component Demo | WTS Calendar';
const expectedDescription =
  'Explore a WTS Calendar Angular calendar component demo with month, week, and day views, events, themes, and developer-ready integration.';

const root = new URL('../', import.meta.url);
const readText = (path) => readFileSync(new URL(path, root), 'utf8');
const readBuffer = (path) => readFileSync(new URL(path, root));
const assertIncludes = (content, needle, label) => {
  assert.ok(content.includes(needle), `${label} missing`);
};

const index = readText('src/index.html');
assertIncludes(index, `<title>${expectedTitle}</title>`, 'SEO title');
assertIncludes(index, `content="${expectedDescription}"`, 'SEO description');
assertIncludes(index, `<link rel="canonical" href="${productionUrl}" />`, 'canonical URL');
assertIncludes(index, '<meta name="robots" content="index, follow, max-image-preview:large" />', 'robots meta');
assertIncludes(index, '<meta property="og:type" content="website" />', 'Open Graph type');
assertIncludes(index, `<meta property="og:url" content="${productionUrl}" />`, 'Open Graph URL');
assertIncludes(index, '<meta name="twitter:card" content="summary_large_image" />', 'Twitter card');
assertIncludes(index, '<script type="application/ld+json">', 'JSON-LD script');

const jsonLdMatch = index.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);
assert.ok(jsonLdMatch, 'JSON-LD block missing');
const jsonLd = JSON.parse(jsonLdMatch[1]);
assert.equal(jsonLd['@context'], 'https://schema.org');
assert.deepEqual(
  jsonLd['@graph'].map((item) => item['@type']).sort(),
  ['SoftwareSourceCode', 'WebPage', 'WebSite'],
);

const appHtml = readText('src/app/app.html');
assertIncludes(
  appHtml,
  'aria-label="Angular calendar component for modern scheduling apps"',
  'keyword-focused H1',
);
for (const term of [
  'WTS Calendar Angular',
  'month view',
  'week view',
  'day view',
  'events',
  'themes',
]) {
  assertIncludes(appHtml, term, `visible SEO copy term: ${term}`);
}

const robots = readText('public/robots.txt');
assertIncludes(robots, 'User-agent: *', 'robots user-agent');
assertIncludes(robots, 'Allow: /', 'robots allow');
assertIncludes(robots, `Sitemap: ${productionUrl}sitemap.xml`, 'robots sitemap');

const sitemap = readText('public/sitemap.xml');
assertIncludes(sitemap, `<loc>${productionUrl}</loc>`, 'sitemap URL');
assertIncludes(sitemap, '<lastmod>2026-09-24</lastmod>', 'sitemap lastmod');

assert.ok(existsSync(new URL('public/og-image.png', root)), 'Open Graph image missing');
const ogImage = readBuffer('public/og-image.png');
assert.equal(ogImage.toString('ascii', 1, 4), 'PNG');
assert.equal(ogImage.readUInt32BE(16), 1200, 'Open Graph image width');
assert.equal(ogImage.readUInt32BE(20), 630, 'Open Graph image height');
