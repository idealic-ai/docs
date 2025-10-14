import * as fs from 'node:fs';
import * as path from 'node:path';
import { getMarkdownContent } from '../utils/i18n';

// Define types
export interface Chapter {
  id: string;
  number: number;
  numberStr: string;
  name: string;
  slug: string;
  path: string;
  url: string;
}

export interface Sitemap {
  [key: string]: Chapter[];
}

const DOC_FOLDERS = ['manifesto', 'edict', 'acts', 'blueprint'];

async function getChaptersForDocument(document: string, lang: string = 'en'): Promise<Chapter[]> {
  const COMPILED_DIR = path.resolve(process.cwd(), `./${document}`);
  try {
    const dirents = await fs.promises.readdir(COMPILED_DIR, { withFileTypes: true });
    const chapters: Chapter[] = [];

    for (const dirent of dirents) {
      if (dirent.isFile() && dirent.name.endsWith('.md')) {
        const fileMatch = dirent.name.match(/^(part(\d+)|(\d+)[._]*(.*))\.md$/);
        if (!fileMatch) continue;

        const numberStr = fileMatch[2] || fileMatch[3] || '0';
        const chapterNum = parseInt(numberStr, 10);

        const { markdownContent } = await getMarkdownContent(document, dirent.name, lang);

        const titleMatch = markdownContent.match(/^(#|##) (.*)/m);
        let chapterName: string;
        if (document === 'acts' && titleMatch) {
          chapterName = titleMatch[2].replace(/.*?: /i, '').trim();
        } else {
          // Prioritize filename for chapter name, fallback to title.
          chapterName = titleMatch
            ? titleMatch[2].replace(/.*?: /i, '').trim().replaceAll('*', '').replace('The ', '')
            : dirent.name.replace('.md', '');
        }

        // Generate slug from filename
        const slug = dirent.name.replace('.md', '').toLowerCase();

        const chapter: Chapter = {
          id: chapterName,
          number: chapterNum,
          numberStr,
          name: chapterName,
          slug: slug,
          path: dirent.name,
          url: `/${document}/${slug}.md`,
        };
        chapters.push(chapter);
      }
    }

    return chapters.sort((a, b) => a.number - b.number);
  } catch (error) {
    console.error(`Error loading chapters list for ${document}:`, error);
    return [];
  }
}

export async function getSitemap(lang: string = 'en'): Promise<Sitemap> {
  const sitemap: Sitemap = {};
  for (const doc of DOC_FOLDERS) {
    sitemap[doc] = await getChaptersForDocument(doc, lang);
  }
  return sitemap;
}
