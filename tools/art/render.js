/* Renders every illustration from tools/art/art.html through headless
   Chromium and writes PNGs into assets/img/. Run: node tools/art/render.js */
const { chromium } = require('/tmp/claude-0/-home-user-jennipho/7d3feb6f-d0df-5ea6-97f0-99b2297803ad/scratchpad/node_modules/playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');

const JOBS = [
  ['pho',          'pho-bowl',     1600, 1000],
  ['pho',          'hero',         1200, 1200],
  ['bun-bo-hue',   'bun-bo-hue',   1600, 1000],
  ['spring-rolls', 'spring-rolls', 1000,  800],
  ['banh-mi',      'banh-mi',      1000,  800],
  ['vermicelli',   'vermicelli',   1000,  800],
  ['rice-plate',   'rice-plate',   1000,  800],
  ['fried-rice',   'fried-rice',   1000,  800],
  ['drinks',       'drinks',       1000,  800],
  ['dessert',      'dessert',      1000,  800],
  ['dining-room',  'dining-room',  1000, 1250],
  ['storefront',   'storefront',   1600, 1000],
];

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [dish, name, w, h] of JOBS) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(`file://${ROOT}/tools/art/art.html?d=${dish}&w=${w}&h=${h}`);
    await p.waitForTimeout(900);
    await p.locator('#c').screenshot({ path: `${ROOT}/assets/img/${name}.jpg`, type: 'jpeg', quality: 82 });
    console.log(`${name}.jpg  ${w}x${h}  ${errs.length ? 'ERR ' + errs.join('|') : 'ok'}`);
    await p.close();
  }
  await b.close();
})();
