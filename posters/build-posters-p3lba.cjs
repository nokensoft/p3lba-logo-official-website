// Membuat 11 poster carousel Instagram (4:5, 1080×1350) penawaran awal website P3LBA.
// Butuh: Google Chrome terpasang + paket `puppeteer-core` (npm i puppeteer-core).
// Jalankan dari root repo:  node posters/build-posters-p3lba.cjs
// Hasil: posters/p3lba-carousel-NN.png (desain disunting di posters/posters-p3lba.html)
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const OUT = __dirname;
const SHOTS = path.join(OUT, 'shots-p3lba');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync(SHOTS, { recursive: true });

// pisahkan #hash agar tidak ikut di-encode menjadi bagian nama file
const url = (p) => { const [file, hash] = p.split('#'); return pathToFileURL(path.join(ROOT, file)).href + (hash ? '#' + hash : ''); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--allow-file-access-from-files', '--hide-scrollbars'] });
  try {
    // --- 1. Tangkapan layar situs ---
    const shot = async (page, file, w, h, dpr, { scrollTo, offset = 72, after, wait = 2000 } = {}) => {
      const tab = await browser.newPage();
      await tab.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
      await tab.goto(url(page), { waitUntil: 'networkidle2', timeout: 60000 });
      await sleep(1800);
      if (scrollTo) {
        await tab.evaluate((sel, off) => { const el = document.querySelector(sel); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - off); }, scrollTo, offset);
        await sleep(wait);
      }
      if (after) { await tab.evaluate(after); await sleep(600); }
      await tab.screenshot({ path: path.join(SHOTS, file), type: 'jpeg', quality: 85 });
      await tab.close();
    };
    await shot('index.html', 'home-desktop.jpg', 1440, 900, 1);
    await shot('index.html', 'home-mobile.jpg', 390, 844, 2);
    await shot('admin.html#admin', 'admin-desktop.jpg', 1440, 900, 1);
    await shot('dampak.html', 'dampak-desktop.jpg', 1440, 900, 1, { scrollTo: '#galeri', offset: 40 });
    await shot('program.html', 'program-tablet.jpg', 820, 1180, 1, { scrollTo: '#program', offset: 40 });
    await shot('kontak.html', 'kontak-desktop.jpg', 1440, 900, 1, { scrollTo: '#terlibat', offset: 40, wait: 6000 });
    await shot('kontak.html', 'kontak-mobile.jpg', 390, 844, 2, { scrollTo: '#terlibat', offset: 60 });

    // --- 2. Poster ---
    const p = await browser.newPage();
    await p.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
    await p.goto(pathToFileURL(path.join(OUT, 'posters-p3lba.html')).href, { waitUntil: 'networkidle0' });
    await p.evaluate(() => document.fonts.ready);
    await sleep(800);
    const n = await p.$$eval('.slide', (s) => s.length);
    for (let i = 0; i < n; i++) {
      await p.evaluate((k) => {
        document.body.classList.add('render');
        document.querySelectorAll('.slide').forEach((s, j) => s.classList.toggle('show', j === k));
        window.scrollTo(0, 0);
      }, i);
      await sleep(200);
      await p.screenshot({ path: path.join(OUT, `p3lba-carousel-${String(i + 1).padStart(2, '0')}.png`), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    }
    console.log(`${n} poster dibuat di ${OUT}`);
  } finally {
    await browser.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
