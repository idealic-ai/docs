import fs from 'fs/promises';
import path from 'path';
import { getSitemap } from '../data/sitemap';
import { processMarkdown } from '../utils/markdown';

const DYNAMIC_SECTIONS: Record<string, string> = {
  'The Co-Liberation Manifesto': 'manifesto',
  'Edict Of Autonomy': 'edict',
  'Requests for Comments': 'rfc',
};

function fixLinks(content: string, prefix: string): string {
  // Regex to find markdown links like [text](./path) and fix them
  return content.replace(/(\[.+?\]\(\.\/)/g, `$1${prefix}/`);
}

export async function data() {
  let finalContent = `# Documentation\n\nThis repository contains the core documentation for the project, including the AI System Bible, philosophical manifestos, and technical specifications.`;

  for (const [title, docPath] of Object.entries(DYNAMIC_SECTIONS)) {
    const indexPath = path.resolve(process.cwd(), docPath, 'index.md');

    const indexContentRaw = await fs.readFile(indexPath, 'utf-8');

    // Replace top-level heading with a second-level one
    const contentWithTweakedHeader = indexContentRaw.replace(/^#\s/m, '## ');
    const fixedLinksContent = fixLinks(contentWithTweakedHeader, docPath);

    finalContent += `\n\n---\n\n${fixedLinksContent.trim().replace(/\n---\n/g, '\n')}`;
  }

  const content = await processMarkdown(finalContent.trim());
  const title = 'Index';
  const description = 'Index of all documents';
  const sitemap = await getSitemap();

  return {
    content,
    title,
    description,
    sitemap,
  };
}
