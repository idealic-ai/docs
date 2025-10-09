import 'dotenv/config';
import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { getAdaptedDocument } from '../src/data/translator';
import { LANGUAGES } from '../src/utils/languages';

async function translateFile(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;

    console.log(`Translating ${filePath} to ${lang}...`);
    try {
      const translatedContent = await getAdaptedDocument(content, lang);
      const relativePath = path.relative(process.cwd(), filePath);
      const destPath = path.resolve(process.cwd(), 'translations', lang, relativePath);
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, translatedContent);
      console.log(`Finished translating ${filePath} to ${lang}.`);
    } catch (e) {
      console.error(`Failed to translate ${filePath} to ${lang}:`, e);
    }
  }
}

async function main() {
  const defaultGlob = '{edict,manifesto,rfc}/**/*.md';
  const globPattern = process.argv[2] || defaultGlob;

  const files = await glob(globPattern, {
    cwd: process.cwd(),
    absolute: true,
  });

  await Promise.all(files.map(translateFile));
}

main().catch(console.error);
