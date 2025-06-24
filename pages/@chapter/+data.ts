import * as fs from 'fs';
import { marked } from 'marked';
import * as path from 'path';
import { fileURLToPath } from 'url';
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHAPTERS_DIR = path.resolve(__dirname, '../../chapters');

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
    const chapterFiles = await fs.promises.readdir(CHAPTERS_DIR);
    const allSubtypes = Array.from(
      new Set(chaptersWithSubtypes.flatMap(c => Object.keys(c.files)))
    ).filter(t => t !== 'chapter');

    // Determine which file to load based on chapterName and subtype
    const targetFile = chapterFiles.find(file => {
      const lowerFile = file.toLowerCase();
      if (!lowerFile.includes(chapterName.toLowerCase()) || !file.endsWith('.md')) {
        return false;
      }

      if (subtype) {
        return lowerFile.includes(subtype.toLowerCase());
      }

      return !allSubtypes.some(s => lowerFile.includes(`.${s}.`));
    });

    if (!targetFile) {
      throw new Error(`Chapter ${chapterName}${subtype ? ' ' + subtype : ''} not found`);
    }

    // Read the chapter content
    const markdownContent = await fs.promises.readFile(
      path.join(CHAPTERS_DIR, targetFile),
      'utf-8'
    );

    // Convert markdown to HTML - ensure it's a string not a promise
    const htmlContent = await Promise.resolve(marked.parse(markdownContent));

    return {
      chaptersWithSubtypes,
      content: htmlContent,
      currentChapter: chapterName,
      currentSubtype: subtype || null,
      currentFile: targetFile.replace(/\.md$/, ''),
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterName}:`, error);
    throw error;
  }
}

async function getChaptersWithSubtypes(): Promise<Chapter[]> {
  try {
    const files = await fs.promises.readdir(CHAPTERS_DIR);
    const allFiles = files.filter(file => file.endsWith('.md'));

    // Group files by their base chapter
    const chaptersMap = new Map<string, Chapter>();

    allFiles.forEach(file => {
      // Extract chapter number and name
      const match = file.match(/^(\d+)\.\s*([^.]+)/);
      if (!match) return;

      const chapterNum = match[1];
      const chapterName = match[2].trim();
      const chapterId = `${chapterNum}. ${chapterName}`;

      // Determine file type
      const parts = file.slice(0, -3).split('.');
      let type = 'chapter';
      if (parts.length > 2) {
        type = parts[parts.length - 1];
      }

      // Add to map
      if (!chaptersMap.has(chapterId)) {
        chaptersMap.set(chapterId, {
          id: chapterId,
          number: parseInt(chapterNum),
          name: chapterName,
          files: {},
        });
      }

      chaptersMap.get(chapterId)!.files[type] = {
        id: file.replace(/\.md$/, ''),
        path: file,
        displayName: type.charAt(0).toUpperCase() + type.slice(1),
      };
    });

    // Convert map to array and sort by chapter number
    return Array.from(chaptersMap.values()).sort((a, b) => a.number - b.number);
  } catch (error) {
    console.error('Error loading chapters list:', error);
    return [];
  }
}
