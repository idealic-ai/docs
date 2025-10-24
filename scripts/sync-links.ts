import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainActsDir = path.resolve(__dirname, '../acts');
const translationsDir = path.resolve(__dirname, '../translations');

const getCanonicalNumbering = (dir: string): Map<string, string> => {
  const numberingMap = new Map<string, string>();
  if (!fs.existsSync(dir)) {
    console.error(`Source directory not found: ${dir}`);
    return numberingMap;
  }
  const files = fs.readdirSync(dir).filter(f => f.match(/^\d{3}_.*\.md$/));
  for (const file of files) {
    const match = file.match(/^(\d{3})_(.*)\.md$/);
    if (match) {
      const [, number, name] = match;
      numberingMap.set(name, number);
    }
  }
  return numberingMap;
};

const syncLinksInDir = (dir: string, canonicalMap: Map<string, string>) => {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found, skipping: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    const urlRegex = /(href="[./]*|]\(\.?\/)(\d{3})_([^".)]+)(\.md)?(["\)])/g;
    content = content.replace(urlRegex, (match, prefix, number, name, ext, suffix) => {
      const canonicalNumber = canonicalMap.get(name);
      if (canonicalNumber && canonicalNumber !== number) {
        console.log(
          `In ${file}: Found outdated URL for ${name}. Correcting ${number} -> ${canonicalNumber}`
        );
        return `${prefix}${canonicalNumber}_${name}${ext || ''}${suffix}`;
      }
      return match;
    });

    const titleRegex = /((?::term)?\[)(\d{3}):\s*([^\]]+)\]/g;
    content = content.replace(titleRegex, (match, prefix, number, name) => {
      const key = name.toLowerCase().replace(/\//g, '_');
      const canonicalNumber = canonicalMap.get(key);
      if (canonicalNumber && canonicalNumber !== number) {
        console.log(
          `In ${file}: Found outdated title for ${name}. Correcting ${number} -> ${canonicalNumber}`
        );
        return `${prefix}${canonicalNumber}: ${name}]`;
      }
      return match;
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated links in ${filePath}`);
    }
  }
};

const main = () => {
  console.log('Starting link synchronization...');
  const canonicalMap = getCanonicalNumbering(mainActsDir);
  if (canonicalMap.size === 0) {
    console.error('Could not build canonical numbering map. Aborting.');
    return;
  }

  const dirsToSync = [
    mainActsDir,
    path.join(translationsDir, 'ru/acts'),
    path.join(translationsDir, 'simple-en/acts'),
    path.join(translationsDir, 'simple-ru/acts'),
  ];

  for (const dir of dirsToSync) {
    syncLinksInDir(dir, canonicalMap);
  }

  console.log('Link synchronization complete.');
};

main();
