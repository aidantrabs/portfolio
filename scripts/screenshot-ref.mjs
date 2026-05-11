import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const url = process.env.URL || 'https://109ichiki.com/';
const outDir = process.env.OUT || './screenshots/ref';
mkdirSync(outDir, { recursive: true });

const sizes = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const size of sizes) {
    const ctx = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(3500);

    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = size.height;
    const steps = Math.max(1, Math.ceil(totalHeight / viewportHeight));

    for (let i = 0; i < Math.min(steps, 6); i++) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), i * viewportHeight);
        await page.waitForTimeout(700);
        await page.screenshot({
            path: `${outDir}/${size.name}-${String(i).padStart(2, '0')}.png`,
            fullPage: false,
        });
    }

    await ctx.close();
}

await browser.close();
console.log('done');
