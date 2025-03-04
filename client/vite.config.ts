import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
    plugins: [angular()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // Your backend server
                changeOrigin: true,
                secure: false, // If using HTTPS with self-signed cert
                rewrite: (path) => path.replace(/^\/api/, '/api')
            }
        }
    }
});
