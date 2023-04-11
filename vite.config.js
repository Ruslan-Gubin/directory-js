import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import TemplateLoader from './plugins/vite-template-plugin';

export default defineConfig({
    build: {
        target: 'es2015',
        outDir: 'dist',
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: true,
    },
    plugins: [
        TemplateLoader(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        })
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './test-setup/setup.js',
        testTimeout: 60000,
        include: [ 
            '**/*.{test,spec}.ts',
    ],
    },
})