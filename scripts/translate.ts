import 'dotenv/config';
import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { getAdaptedDocument } from '../src/data/translator';
import { LANGUAGES } from '../src/utils/languages';

async function translateFile(filePath: string) {
  const isUiJson = filePath.endsWith('src/data/ui.json');

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;

    console.log(`Translating ${filePath} to ${lang}...`);
    try {
      let translatedContent: string;
      let destPath: string;

      const content = await fs.readFile(filePath, 'utf-8');

      translatedContent = await getAdaptedDocument(content, lang);
      const relativePath = path.relative(path.resolve(process.cwd(), 'docs'), filePath);
      destPath = path.resolve(
        process.cwd(),
        'translations',
        lang,
        relativePath.replace(/\.\.\/src\//g, '')
      );

      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, translatedContent);
      console.log(`Finished translating ${destPath}`);
    } catch (e) {
      console.error(`Failed to translate ${filePath} to ${lang}:`, e);
    }
  }
}

async function main() {
  const defaultGlob = '{edict,manifesto,rfc}/**/*.md';
  //const defaultGlob = 'src/data/ui.json';
  const globPattern = process.argv[2] || defaultGlob;

  const files = await glob(globPattern, {
    cwd: process.cwd(),
    absolute: true,
  });

  await Promise.all(files.map(translateFile));
}

main().catch(console.error);
