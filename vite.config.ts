import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vike(), react()],
  build: {
    target: 'es2022',
  },
  // For GitHub Pages with /docs/ repository
  base: '/docs/',
});
