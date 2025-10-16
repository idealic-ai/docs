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

export interface GlossaryEntry {
  definition: string;
  slug: string;
}

export type Glossary = Record<string, GlossaryEntry>;

const DOC_FOLDERS = ['manifesto', 'edict', 'acts', 'blueprint'];

export async function getGlossary(lang: string = 'en'): Promise<Glossary> {
  const { markdownContent } = await getMarkdownContent('acts', '000_glossary.md', lang);
  const glossary: Glossary = {};
  const regex = /^- \*\*(.+?)\*\*:\s*(.*)/gm;

  let match;
  while ((match = regex.exec(markdownContent)) !== null) {
    const term = match[1].trim();
    let definition = match[2].trim();

    // Look for a sidenote and append it.
    const sidenoteRegex = /Sidenote:\s*-\s*\[.*?\]\((.*?)\)/;
    const nextLineIndex = markdownContent.indexOf('\n', match.index + match[0].length);
    const subsequentLines = markdownContent.substring(
      match.index + match[0].length,
      nextLineIndex !== -1 ? markdownContent.indexOf('\n', nextLineIndex + 1) : undefined
    );
    const sidenoteMatch = subsequentLines.match(sidenoteRegex);

    if (sidenoteMatch) {
      definition += ` <a href="${sidenoteMatch[1]}">See also.</a>`;
    }
    const slug = term
      .toLowerCase()
      .replace(/\(.*\)/g, '')
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    glossary[term] = { definition, slug };
  }
  return glossary;
}

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
