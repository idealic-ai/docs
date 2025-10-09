import fs from 'node:fs/promises';
import path from 'node:path';

export interface UIStrings {
  [key: string]: {
    short: string;
    long: string;
    toc_link: string;
  };
}

let uiStrings: UIStrings;

export async function getUiStrings(lang: string = 'en'): Promise<UIStrings> {
  if (uiStrings && lang === 'en') {
    return uiStrings;
  }

  const filePath =
    lang === 'en'
      ? path.resolve(process.cwd(), './src/data/ui.json')
      : path.resolve(process.cwd(), `./translations/${lang}/data/ui.json`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const strings = JSON.parse(fileContent);
    if (lang === 'en') {
      uiStrings = strings;
    }
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
