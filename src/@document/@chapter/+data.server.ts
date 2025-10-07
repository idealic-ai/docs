import * as fs from 'node:fs';
import * as path from 'node:path';
import type { PageContextServer } from 'vike/types';
import { getSitemap } from '../../data/sitemap';
import { processMarkdown } from '../../utils/markdown';

interface PageData {
  content: string | null;
  currentChapter: string | null;
  sitemap: Sitemap;
}

export async function data(pageContext: PageContextServer): Promise<PageData> {
  const { document, chapterSlug } = (pageContext.routeParams as {
    document: string;
    chapterSlug: string;
  }) || { document: '', chapterSlug: '' };

  const sitemap = await getSitemap();

  if (!chapterSlug) {
    return {
      content: null,
      currentChapter: null,
      sitemap,
    };
  }

  try {
    const chapters = sitemap[document] || [];
    console.log(chapters);
    const chapter = chapters.find(c => c.slug.toLowerCase() === chapterSlug.toLowerCase());
    if (!chapter) {
      throw new Error(`Chapter ${chapterSlug} not found in ${document}`);
    }

    const COMPILED_DIR = path.resolve(process.cwd(), `./${document}`);

    // Read the chapter content
    const markdownContent = await fs.promises.readFile(
      path.join(COMPILED_DIR, chapter.path),
      'utf-8'
    );

    // Convert markdown to HTML
    const htmlContent = await processMarkdown(markdownContent);

    return {
      sitemap,
      content: htmlContent,
      currentChapter: chapter.name,
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterSlug} from ${document}:`, error);
    throw error;
  }
}
