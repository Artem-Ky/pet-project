import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        svgrPlugin({
            include: '**/*.svg',
            svgrOptions: {
                exportType: 'default',
            },
        }),
        react(),
    ],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    server: {
        port: 3000,
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
