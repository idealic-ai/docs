import vikeReact from 'vike-react/config';
import { Config } from 'vike/types';
import { UserConfig } from 'vite';

// Using a simpler approach to avoid type errors
const config: UserConfig & { extends: Config[] } = {
  extends: [vikeReact],
  build: {
    target: 'es2022',
    outDir: 'docs', // ✅ GitHub Pages will use this folder directly
  },
  server: {
    fs: {
      deny: ['rfc', 'blueprint', 'manifesto'],
    },
  },

  base: '/docs/',

  publicDir: 'public',
};

export default config;
