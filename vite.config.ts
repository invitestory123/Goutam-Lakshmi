import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        bride: resolve(import.meta.dirname, 'bride.html'),
        groom: resolve(import.meta.dirname, 'groom.html'),
      },
    },
  },
  server: {
    port: 5188,
    strictPort: true,
    host: '0.0.0.0',
  },
});
