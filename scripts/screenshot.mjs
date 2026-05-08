import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const url = process.env.URL || 'http://localhost:4321/';
const outDir = process.env.OUT || './screenshots';
mkdirSync(outDir, { recursive: true });

const sizes = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 820, height: 1180 },
    { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const size of sizes) {
    const ctx = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2500);

    await page.screenshot({
        path: `${outDir}/${size.name}-hero.png`,
        fullPage: false,
    });
    await page.screenshot({
        path: `${outDir}/${size.name}-full.png`,
        fullPage: true,
    });

    await ctx.close();
}

await browser.close();
console.log('done');
