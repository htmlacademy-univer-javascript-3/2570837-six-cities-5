/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@components': `${path.resolve(__dirname, 'src')}/components`,
      '@pages': `${path.resolve(__dirname, 'src')}/pages`,
      '@const': `${path.resolve(__dirname, 'src')}/const`,
      '@mocks': `${path.resolve(__dirname, 'src')}/mocks`,
      '@hooks': `${path.resolve(__dirname, 'src')}/hooks`,
      '@store': `${path.resolve(__dirname, 'src')}/store`,
      '@services': `${path.resolve(__dirname, 'src')}/services`,
    }
  }
});
