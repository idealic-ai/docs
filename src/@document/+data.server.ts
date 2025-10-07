import * as fs from 'node:fs';
import * as path from 'node:path';
import type { PageContextServer } from 'vike/types';
import { getSitemap } from '../data/sitemap';
import { processMarkdown } from '../utils/markdown';

export async function data(pageContext: PageContextServer) {
  const { document } = pageContext.routeParams as { document: string };

  const sitemap = await getSitemap();

  try {
    const COMPILED_DIR = path.resolve(process.cwd(), `./${document}`);
    const markdownContent = await fs.promises.readFile(
      path.join(COMPILED_DIR, 'index.md'),
      'utf-8'
    );
    const htmlContent = await processMarkdown(markdownContent);

    return {
      sitemap,
      content: htmlContent,
      title: document.charAt(0).toUpperCase() + document.slice(1),
    };
  } catch (error) {
    console.error(`Error loading index for ${document}:`, error);
    throw error;
  }
}
