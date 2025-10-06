import { marked } from 'marked';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { PageContextServer } from 'vike/types';

// Define types
interface ChapterFile {
  id: string;
  path: string;
  displayName: string;
}

interface Chapter {
  id: string;
  number: number;
  name: string;
  files: Record<string, ChapterFile>;
}

interface PageData {
  chaptersWithSubtypes: Chapter[];
  content: string | null;
  currentChapter: string | null;
  currentSubtype: string | null;
  currentFile?: string;
}

// Use dirname workaround for ESM
// @ts-ignore - import.meta is valid in ESM
const __filename = import.meta.url;
const __dirname = path.dirname(__filename);
const COMPILED_DIR = path.resolve(__dirname, '../../compiled');

export async function data(pageContext: PageContextServer): Promise<PageData> {
  // Get the chapter name and subtype from the URL
  const { chapterName, subtype } = pageContext.routeParams || {};

  // Get all chapters with their related files
  const chaptersWithSubtypes = await getChaptersWithSubtypes();

  if (!chapterName) {
    return {
      chaptersWithSubtypes,
      content: null,
      currentChapter: null,
      currentSubtype: null,
    };
  }

  try {
    const chapter = chaptersWithSubtypes.find(
      c => c.name.toLowerCase() === chapterName.toLowerCase()
    );
    if (!chapter) {
      throw new Error(`Chapter ${chapterName} not found`);
    }

    // Determine which file to load based on chapterName and subtype
    const fileToRead = subtype
      ? chapter.files[subtype]
      : chapter.files.chapter || Object.values(chapter.files)[0];

    if (!fileToRead) {
      throw new Error(`Chapter ${chapterName}${subtype ? ' ' + subtype : ''} not found`);
    }

    // Read the chapter content
    const markdownContent = await fs.promises.readFile(
      path.join(COMPILED_DIR, fileToRead.path),
      'utf-8'
    );

    // Convert markdown to HTML - ensure it's a string not a promise
    const htmlContent = await Promise.resolve(marked.parse(markdownContent));

    return {
      chaptersWithSubtypes,
      content: htmlContent,
      currentChapter: chapterName,
      currentSubtype: subtype || null,
      currentFile: fileToRead.id,
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterName}:`, error);
    throw error;
  }
}

export async function getChaptersWithSubtypes(): Promise<Chapter[]> {
  try {
    const dirents = await fs.promises.readdir(COMPILED_DIR, { withFileTypes: true });
    const chapters: Chapter[] = [];

    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        const dirName = dirent.name;
        const match = dirName.match(/^(\d+)\.\s*(.*)/);
        if (!match) continue;

        const chapterNum = parseInt(match[1], 10);
        const chapterName = match[2].trim();
        const chapter: Chapter = {
          id: chapterName,
          number: chapterNum,
          name: chapterName,
          files: {},
        };

        const files = await fs.promises.readdir(path.join(COMPILED_DIR, dirName));
        for (const file of files) {
          if (file.endsWith('.md')) {
            const fileNameNoExt = file.slice(0, -3);
            const parts = fileNameNoExt.split('.');
            const type = parts.length > 2 ? parts[parts.length - 1] : 'chapter';

            chapter.files[type] = {
              id: fileNameNoExt,
              path: path.join(dirName, file),
              displayName: type.charAt(0).toUpperCase() + type.slice(1),
            };
          }
        }

        if (Object.keys(chapter.files).length > 0) {
          chapters.push(chapter);
        }
      }
    }

    return chapters.sort((a, b) => a.number - b.number);
  } catch (error) {
    console.error('Error loading chapters list:', error);
    return [];
  }
}
