import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
import { getChaptersWithSubtypes } from './@chapter/+data.server';
import Layout from './layouts/LayoutDefault';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: 'My Vike App',
  description: 'Demo showcasing Vike',

  extends: vikeReact,

  ssr: false,

  // See https://vike.dev/prerender
  prerender: false,

  // Generate URLs for pre-rendering
  onBeforePrerenderStart: async () => {
    const urls = ['/'];
    const chapters = await getChaptersWithSubtypes();

    for (const chapter of chapters) {
      urls.push(`/chapter/${encodeURIComponent(chapter.name)}`);

      for (const subtype in chapter.files) {
        if (subtype !== 'chapter') {
          urls.push(`/chapter/${encodeURIComponent(chapter.name)}/${encodeURIComponent(subtype)}`);
        }
      }
    }

    return urls;
  },
} satisfies Config;
