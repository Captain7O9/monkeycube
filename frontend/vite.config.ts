import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  envDir: './..',
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
