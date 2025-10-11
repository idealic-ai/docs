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
    .filter(line => line[0] !== 'D' && line[1] !== 'D')
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

async function translateFile(filePath: string, lang: string) {
  if (lang === 'en') {
    return;
  }
  console.log(`Translating ${filePath} to ${lang}...`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const translatedContent = await getAdaptedDocument(content, lang);
    const relativePath = path.relative(path.resolve(process.cwd(), 'docs'), filePath);
    const destPath = path.resolve(
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

async function main() {
  const args = process.argv.slice(2);
  const availableLangs = LANGUAGES.filter(l => l !== 'en');

  let targetLangs: string[] = [];
  if (args.includes('all')) {
    targetLangs.push(...availableLangs);
  } else {
    const langArgs = args.filter(arg => availableLangs.includes(arg));
    if (langArgs.length > 0) {
      targetLangs.push(...langArgs);
    }
  }

  targetLangs = [...new Set(targetLangs)];

  if (targetLangs.length === 0) {
    targetLangs = ['simple-ru', 'simple-en', 'ru'];
  }

  let files: string[] = [];
  const globPatterns = args.filter(
    arg => !availableLangs.includes(arg) && arg !== 'ui' && arg !== 'all'
  );

  if (args.includes('ui')) {
    files.push(path.resolve(process.cwd(), 'src/data/ui.json'));
  }

  if (globPatterns.length > 0) {
    console.log(`Using glob patterns: ${globPatterns.join(', ')}`);
    const globResults = await Promise.all(
      globPatterns.map(pattern =>
        glob(pattern, {
          cwd: process.cwd(),
          absolute: true,
        })
      )
    );
    files.push(...globResults.flat());
  } else if (!args.includes('ui')) {
    console.log('No glob pattern provided, checking for changed markdown files in git...');
    const changedFiles = await (
      await getChangedMarkdownFiles()
    ).filter(c => !c.includes('translations'));
    if (changedFiles.length === 0) {
      console.log('No changed markdown files found.');
      return;
    }
    console.log(
      'Files to translate:\n',
      changedFiles.map(f => ` - ${path.relative(process.cwd(), f)}`).join('\n')
    );
    files.push(...changedFiles);
  }
  files = [...new Set(files)];

  if (files.length === 0) {
    console.log('No files to translate.');
    return;
  }

  files = files.filter(file => file.endsWith('instancing.md'));
  console.log(`Translating to languages: ${targetLangs.join(', ')}`);

  await Promise.all(
    files.flatMap(filePath => targetLangs.map(lang => translateFile(filePath, lang)))
  );
}

main().catch(console.error);
