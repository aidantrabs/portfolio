import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const SIZE_PATTERN = /<span class="text-accent">~[\d.]+kb(?:&nbsp;)?<\/span>/i;

function getFilesRecursively(dir) {
    const files = [];
    for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            files.push(...getFilesRecursively(fullPath));
        } else {
            files.push(fullPath);
        }
    }
    return files;
}

function calculateTotalGzipSize(dir) {
    return getFilesRecursively(dir).reduce((total, filePath) => {
        const content = readFileSync(filePath);
        return total + gzipSync(content).length;
    }, 0);
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes}b`;
    const kb = bytes / 1024;
    return kb < 10 ? `~${kb.toFixed(1)}kb` : `~${Math.round(kb)}kb`;
}

function buildSize() {
    return {
        name: 'build-size',
        hooks: {
            'astro:build:done': ({ dir }) => {
                const outDir = dir.pathname;
                const sizeStr = formatBytes(calculateTotalGzipSize(outDir));
                const htmlFiles = getFilesRecursively(outDir).filter((f) => f.endsWith('.html'));
                for (const htmlPath of htmlFiles) {
                    const html = readFileSync(htmlPath, 'utf-8');
                    if (SIZE_PATTERN.test(html)) {
                        writeFileSync(
                            htmlPath,
                            html.replace(
                                SIZE_PATTERN,
                                `<span class="text-accent">${sizeStr}&nbsp;</span>`
                            )
                        );
                    }
                }
                console.log(`\n  Build size: ${sizeStr} gzip\n`);
            },
        },
    };
}

export default defineConfig({
    integrations: [buildSize()],
    vite: {
        plugins: [tailwindcss()],
    },
    build: {
        inlineStylesheets: 'auto',
    },
    compressHTML: true,
});
