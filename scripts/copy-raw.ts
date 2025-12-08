import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const RAW_DIR = path.join(projectRoot, 'public', 'raw');

console.log(`Preparing raw markdown files in ${RAW_DIR}...`);

// Clean raw dir
if (fs.existsSync(RAW_DIR)) {
  fs.rmSync(RAW_DIR, { recursive: true, force: true });
}
fs.mkdirSync(RAW_DIR, { recursive: true });

// Sources to copy to raw/en
const EN_SOURCES = [
  'acts',
  'blueprint',
  'company',
  'edict',
  'manifesto',
  'inspiration',
  'prompts',
  'evolution',
  'ui',
];

// Copy EN sources
const enDir = path.join(RAW_DIR, 'en');
fs.mkdirSync(enDir, { recursive: true });

for (const source of EN_SOURCES) {
  const sourcePath = path.join(projectRoot, source);
  if (fs.existsSync(sourcePath)) {
    console.log(`Copying ${source} to en/${source}`);
    fs.cpSync(sourcePath, path.join(enDir, source), { recursive: true });
  } else {
    console.warn(`Source directory ${source} not found.`);
  }
}

// Copy Translations
const TRANSLATIONS_DIR = path.join(projectRoot, 'translations');
if (fs.existsSync(TRANSLATIONS_DIR)) {
  console.log(`Copying translations from ${TRANSLATIONS_DIR}`);
  // We want to merge translations into RAW_DIR
  // e.g. translations/ru -> RAW_DIR/ru
  const languages = fs.readdirSync(TRANSLATIONS_DIR);
  for (const lang of languages) {
    if (lang.startsWith('.')) continue;
    const langPath = path.join(TRANSLATIONS_DIR, lang);
    const targetPath = path.join(RAW_DIR, lang);

    if (fs.statSync(langPath).isDirectory()) {
      console.log(`Copying translation ${lang}`);
      fs.cpSync(langPath, targetPath, { recursive: true });
    }
  }
}

console.log('Successfully copied raw markdown files to public/raw');
