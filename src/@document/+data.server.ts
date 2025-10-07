import * as fs from 'node:fs';
import * as path from 'node:path';
import type { PageContextServer } from 'vike/types';
import { data as getCommonData } from '../+data';
import { processMarkdown } from '../utils/markdown';

export async function data(pageContext: PageContextServer) {
  const commonData = await getCommonData();
  const { document } = pageContext.routeParams as { document: string };

  try {
    const COMPILED_DIR = path.resolve(process.cwd(), `./${document}`);
    const markdownContent = await fs.promises.readFile(
      path.join(COMPILED_DIR, 'index.md'),
      'utf-8'
    );
    const htmlContent = await processMarkdown(markdownContent);
    const description =
      markdownContent
        .split('\n')
        .filter(line => line.trim() && !line.trim().startsWith('#'))
        .slice(0, 2)
        .join(' ')
        .replace(/[*_`[\]()]/g, '')
        .substring(0, 160) + '...';

    return {
      ...commonData,
      content: htmlContent,
      title: `${document.charAt(0).toUpperCase() + document.slice(1)}`,
      description,
    };
  } catch (error) {
    console.error(`Error loading index for ${document}:`, error);
    throw error;
  }
}
