import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: 'Idealic Documentation',
  description: 'Repository of all the documents: Manifesto, Edict, RFCs, Blueprint',

  extends: vikeReact,

  trailingSlash: true,

  ssr: false,
} satisfies Config;
