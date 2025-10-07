import fs from 'fs/promises';
import path from 'path';
import { data as dataServer } from '../+data';
import { processMarkdown } from '../utils/markdown';

export async function data() {
  const markdownContent = await fs.readFile(path.join(process.cwd(), '.', 'README.md'), 'utf-8');
  const contentHtml = await processMarkdown(markdownContent);
  const commonData = await dataServer();
  return {
    ...commonData,
    contentHtml,
    title: 'System Documentation',
    description: 'Comprehensive overview of our self-evolving operating system architecture.',
  };
}
