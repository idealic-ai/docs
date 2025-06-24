import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

// Using a simpler approach to avoid type errors
export default defineConfig({
  plugins: [
    react(),
    vike({
      prerender: true,
    }),
  ],
  build: {
    target: 'es2022',
  },
  // For GitHub Pages with /docs/ repository
  base: '/docs/',
});
