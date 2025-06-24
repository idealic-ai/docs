import { usePageContext } from 'vike-react/usePageContext';
import { Counter } from './Counter.js';

// Define types for our data structure
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
  currentFile: string | null;
}

export default function Page() {
  const pageContext = usePageContext();
  const { chaptersWithSubtypes, content, currentChapter, currentSubtype, currentFile } =
    (pageContext.data as PageData) || {
      chaptersWithSubtypes: [],
      content: null,
      currentChapter: null,
      currentSubtype: null,
      currentFile: null,
    };

  // Sort function to ensure 'chapter' appears first
  const sortSubtypes = (a: [string, ChapterFile], b: [string, ChapterFile]): number => {
    if (a[0] === 'chapter') return -1;
    if (b[0] === 'chapter') return 1;
    return a[0].localeCompare(b[0]);
  };

  return (
    <div className="chapter-page">
      <div className="sidebar">
        <h3>Chapters</h3>
        <ul className="chapter-list">
          {chaptersWithSubtypes?.map((chapter: Chapter) => (
            <li key={chapter.id} className={currentChapter === chapter.name ? 'active' : ''}>
              {/* Chapter heading */}
              <div className="chapter-heading">
                {chapter.files.chapter ? (
                  <a href={`/chapter/${chapter.name.toLowerCase()}`}>{chapter.id}</a>
                ) : (
                  <span>{chapter.id}</span>
                )}
              </div>

              {/* Subtypes submenu - always expanded */}
              {Object.keys(chapter.files).length > 1 && (
                <ul className="subtype-list">
                  {Object.entries(chapter.files)
                    .sort(sortSubtypes)
                    .map(([type, file]) => (
                      <li key={type} className={currentFile === file.id ? 'active' : ''}>
                        <a
                          href={`/chapter/${chapter.name.toLowerCase()}${
                            type === 'chapter' ? '' : `/${type}`
                          }`}
                        >
                          {file.displayName}
                        </a>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="content">
        {content ? (
          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <div className="welcome">
            <h1>Welcome to Chapters</h1>
            <p>Select a chapter from the sidebar to begin reading.</p>
            <Counter />
          </div>
        )}
      </div>

      <style>{`
        .chapter-page {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: 280px;
          padding: 20px;
          background-color: #f5f5f5;
          border-right: 1px solid #ddd;
          overflow-y: auto;
        }
        .chapter-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .chapter-heading {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
          font-weight: 500;
        }
        .chapter-heading a {
          text-decoration: none;
          color: inherit;
        }
        .chapter-heading a:hover {
          color: #0066cc;
        }
        .subtype-list {
          list-style: none;
          padding-left: 20px;
          margin: 0;
        }
        .subtype-list li {
          padding: 6px 0;
          font-size: 14px;
        }
        .subtype-list li a {
          text-decoration: none;
          color: inherit;
        }
        .subtype-list li a:hover {
          color: #0066cc;
        }
        li.active > .chapter-heading,
        .subtype-list li.active a {
          color: #0066cc;
          font-weight: bold;
        }
        .content {
          flex: 1;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          overflow-y: auto;
        }
        .welcome {
          text-align: center;
          padding: 40px 0;
        }
        .markdown-content {
          line-height: 1.6;
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .markdown-content code {
          background-color: #f0f0f0;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: monospace;
        }
        .markdown-content pre {
          background-color: #f5f5f5;
          padding: 12px;
          border-radius: 4px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
