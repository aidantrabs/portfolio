import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const url = process.env.URL || 'http://localhost:5050/';
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
        deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2500);

    const totalScroll = await page.evaluate(() => {
        const el = document.querySelector('.app-bounds');
        if (!el) return 0;
        return el.scrollHeight - el.clientHeight;
    });

    const steps = Math.max(1, Math.ceil(totalScroll / 800));

    for (let i = 0; i <= steps; i++) {
        const y = Math.min(totalScroll, i * 800);
        await page.evaluate((scrollY) => {
            const el = document.querySelector('.app-bounds');
            if (el) el.scrollTop = scrollY;
        }, y);
        await page.waitForTimeout(500);
        await page.screenshot({
            path: `${outDir}/${size.name}-${String(i).padStart(2, '0')}.png`,
            fullPage: false,
        });
    }

    await ctx.close();
}

await browser.close();
console.log('done');
