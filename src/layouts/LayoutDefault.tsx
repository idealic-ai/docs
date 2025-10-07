import { usePageContext } from 'vike-react/usePageContext';
import '../assets/tufte.css';
import type { Chapter, Sitemap } from '../data/sitemap';

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const { sitemap } = (pageContext.data as { sitemap: Sitemap }) || { sitemap: {} };
  const { urlPathname } = pageContext;

  const pathParts = urlPathname.split('/').filter(Boolean);
  const currentDoc = pathParts[0];
  const currentSlug = pathParts[1];

  let currentChapter: Chapter | undefined;
  if (currentDoc && sitemap[currentDoc]) {
    currentChapter = sitemap[currentDoc].find(c => c.slug === currentSlug);
  }

  return (
    <div>
      <nav>
        {Object.entries(sitemap).map(([doc, chapters]) => {
          const isManifesto = doc === 'manifesto';
          const isCurrentDoc = doc === currentDoc;

          return (
            <div key={doc}>
              <strong>
                <a href={`/docs/${doc}/`}>
                  {doc == 'rfc' ? 'RFCs' : doc.charAt(0).toUpperCase() + doc.slice(1)}
                </a>
              </strong>
              {isManifesto && (
                <>
                  {': '}
                  {chapters.map((chapter: Chapter, index: number) => (
                    <span key={chapter.id}>
                      <a href={'/docs' + chapter.url}>{chapter.name}</a>
                      {index < chapters.length - 1 && ' | '}
                    </span>
                  ))}
                </>
              )}
              {isCurrentDoc && !isManifesto && currentChapter && (
                <>
                  {' -> '}
                  <span>{currentChapter.name}</span>
                </>
              )}
            </div>
          );
        })}
      </nav>
      <main>{children}</main>
    </div>
  );
}
