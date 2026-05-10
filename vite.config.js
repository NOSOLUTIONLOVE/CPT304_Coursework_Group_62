import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
    root: path.resolve(__dirname, 'app'),
    base: './',
    plugins: [
        ...(command === 'build'
            ? [
                  viteStaticCopy({
                      targets: [
                          {
                              src: 'assets/**/*',
                              dest: 'assets',
                              rename: { stripBase: 1 },
                          },
                      ],
                  }),
              ]
            : []),
    ],
    server: {
        fs: {
            allow: [path.resolve(__dirname)],
        },
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'app/index_final0.html'),
                privacy: path.resolve(__dirname, 'app/privacy.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@inventory': path.resolve(__dirname, 'src/inventory/index.js'),
        },
    },
    test: {
        // Vitest would otherwise use vite.root (app/); point tests at repo root so src/ resolves
        root: path.resolve(__dirname),
        include: ['src/**/*.test.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            include: ['src/inventory/**/*.js'],
            exclude: ['src/**/*.test.js'],
        },
    },
}));
