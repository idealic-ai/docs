import fs from 'node:fs/promises';
import path from 'node:path';

export interface UIStrings {
  [key: string]: {
    short: string;
    long: string;
    toc_link: string;
  };
}

export async function getUiStrings(lang: string = 'en'): Promise<UIStrings> {
  const filePath =
    lang === 'en'
      ? path.resolve(process.cwd(), './src/data/ui.json')
      : path.resolve(process.cwd(), `./translations/${lang}/data/ui.json`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const strings = JSON.parse(fileContent);

    return strings;
  } catch (error) {
    if (lang !== 'en') {
      // Fallback to English if translation not found
      return getUiStrings('en');
    }
    console.error(`Failed to load UI strings for lang ${lang}:`, error);
    throw error;
  }
}
