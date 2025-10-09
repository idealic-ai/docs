import vikeReact from 'vike-react/config';
import { Config } from 'vike/types';
import { UserConfig } from 'vite';

// Using a simpler approach to avoid type errors
const config: UserConfig & { extends: Config[] } = {
  extends: [vikeReact],
  build: {
    target: 'es2022',
    commonjsOptions: {
      include: ['@augceo/agent'],
    },
  },

  base: '/docs/',
  publicDir: 'public/dir',
};

export default config;
