import * as fs from 'node:fs';
import * as path from 'node:path';

export async function getMarkdownContent(document: string, filePath: string, lang: string) {
  let markdownContent: string;
  let isTranslated = true;

  const translatedPath = path
    .resolve(process.cwd(), './translations', lang, document, filePath)
    .replace('/translations/en', '');

  try {
    markdownContent = await fs.promises.readFile(translatedPath, 'utf-8');
  } catch (e) {
    isTranslated = false;
    const originalPath = path.resolve(process.cwd(), `./${document}`, filePath);
    markdownContent = await fs.promises.readFile(originalPath, 'utf-8');
  }

  if (!isTranslated) {
    const warning = `> [!WARNING]
> This document has not yet been translated into ${
      lang === 'ru' ? 'Russian' : 'the selected language'
    }. You are reading the original English version.`;
    markdownContent = `${warning}\n\n${markdownContent}`;
  }

  return { markdownContent, isTranslated };
}
