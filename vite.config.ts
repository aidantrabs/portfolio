import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

function buildSizePlugin(): Plugin {
    const SIZE_PATTERN = /<span class="text-accent">~[\d.]+kb<\/span>/i;

    function getFilesRecursively(dir: string): string[] {
        const files: string[] = [];
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

    function calculateTotalGzipSize(dir: string): number {
        return getFilesRecursively(dir).reduce((total, filePath) => {
            const content = readFileSync(filePath);

            return total + gzipSync(content).length;
        }, 0);
    }

    function formatBytes(bytes: number): string {
        if (bytes < 1024) {
            return `${bytes}b`;
        }

        const kb = bytes / 1024;

        return kb < 10 ? `~${kb.toFixed(1)}kb` : `~${Math.round(kb)}kb`;
    }

    return {
        name: 'build-size',
        writeBundle(options) {
            const outDir = options.dir || 'dist';
            const htmlPath = join(outDir, 'index.html');
            const sizeStr = formatBytes(calculateTotalGzipSize(outDir));

            const html = readFileSync(htmlPath, 'utf-8');
            writeFileSync(
                htmlPath,
                html.replace(SIZE_PATTERN, `<span class="text-accent">${sizeStr}</span>`)
            );

            console.log(`\n  Build size: ${sizeStr} gzip\n`);
        },
    };
}

export default defineConfig({
    plugins: [tailwindcss(), buildSizePlugin()],
    build: {
        minify: 'terser',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
