import vikeReact from 'vike-react/config';
import { Config } from 'vike/types';

// Using a simpler approach to avoid type errors
export default {
  extends: [vikeReact],
  build: {
    target: 'es2022',
  },
  // For GitHub Pages with /docs/ repository
  base: '/docs/',
} as Config;
