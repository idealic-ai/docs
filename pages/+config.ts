import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
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

  // See https://vike.dev/prerender
  prerender: {
    partial: true,
  },

  // Generate URLs for pre-rendering
  /*onBeforePrerenderStart: async () => {
    // For the index page
    const urls = ['/'];

    // For chapter pages
    try {
      const chaptersDir = path.join(process.cwd(), 'chapters');
      const chapterFiles = fs.readdirSync(chaptersDir);

      for (const file of chapterFiles) {
        if (file.endsWith('.md')) {
          const chapterName = file.replace('.md', '');
          urls.push(`/@chapter/${encodeURIComponent(chapterName)}`);
        }
      }
    } catch (err) {
      console.error('Error reading chapter files:', err);
    }

    return urls;
  },*/
} satisfies Config;
