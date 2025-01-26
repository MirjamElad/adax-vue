/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    exclude: ["node_modules", 'src/TestApp/**/*'],
    deps: {
      inline: ['adax-core'], // Force Vitest to inline adax-core
    }
  },
  resolve: {
    alias: {
      'adax-core': path.resolve(__dirname, './node_modules/adax-core/dist'), // Adjust the path if needed
    },
  },
});
