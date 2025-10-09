import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
import Layout from './layouts/LayoutDefault';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  redirects: {
    '/': '/docs/en/',
  },

  // https://vike.dev/head-tags

  extends: vikeReact,

  ssr: true,
  prefetchStaticAssets: false,

  // See https://vike.dev/prerender
  prerender: true,
  disableUrlNormalization: true,
} satisfies Config;
