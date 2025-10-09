import { exec } from 'child_process';
import 'dotenv/config';
import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { promisify } from 'util';
import { getAdaptedDocument } from '../src/data/translator';
import { LANGUAGES } from '../src/utils/languages';

const execAsync = promisify(exec);

async function getChangedMarkdownFiles(): Promise<string[]> {
  const { stdout, stderr } = await execAsync('git status --porcelain');
  if (stderr) {
    console.error(`git status stderr: ${stderr}`);
    return [];
  }

  const filePaths = stdout
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => {
      // Handles ' M path/to/file', '?? path/to/file', 'R  old -> new' etc.
      const parts = line.trim().split(/\s+/);
      const status = parts[0];
      let filePath;

      if (status.startsWith('R')) {
        const arrowIndex = parts.indexOf('->');
        filePath = parts.slice(arrowIndex + 1).join(' ');
      } else {
        filePath = parts.slice(1).join(' ');
      }
      return filePath;
    })
    .filter(filePath => filePath && filePath.endsWith('.md'));

  return filePaths.map(p => path.resolve(process.cwd(), p));
}

async function translateFile(filePath: string, targetLangs: string[]) {
  const isUiJson = filePath.endsWith('src/data/ui.json');

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;
    if (!targetLangs.includes(lang)) continue;

    console.log(`Translating ${filePath} to ${lang}...`);
    try {
      let translatedContent: string;
      let destPath: string;

      const content = await fs.readFile(filePath, 'utf-8');

      translatedContent = await getAdaptedDocument(content, lang);
      const relativePath = path.relative(path.resolve(process.cwd(), 'docs'), filePath);
      console.log('relativePath', relativePath);
      destPath = path.resolve(
        process.cwd(),
        'translations',
        lang,
        relativePath.replace(/\.\.\/(src\/)?/g, '')
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
  const globPattern = process.argv[2];
  let files: string[];

  if (globPattern) {
    console.log(`Using glob pattern: ${globPattern}`);
    files = await glob(globPattern, {
      cwd: process.cwd(),
      absolute: true,
    });
  } else {
    console.log('No glob pattern provided, checking for changed markdown files in git...');
    files = await getChangedMarkdownFiles();
    if (files.length === 0) {
      console.log('No changed markdown files found.');
      return;
    }
    console.log(
      'Files to translate:\n',
      files.map(f => ` - ${path.relative(process.cwd(), f)}`).join('\n')
    );
  }

  //files.push('src/data/ui.json');

  await Promise.all(
    files.flatMap(filePath =>
      ['simple-ru', 'simple-en', 'ru'].map(lang => translateFile(filePath, [lang]))
    )
  );
}

main().catch(console.error);
