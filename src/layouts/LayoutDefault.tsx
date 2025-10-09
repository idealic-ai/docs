import { usePageContext } from 'vike-react/usePageContext';
import '../assets/tufte.css';
import { A } from '../components/A';
import type { Chapter, Sitemap } from '../data/sitemap';

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const { sitemap } = (pageContext.data as { sitemap: Sitemap }) || { sitemap: {} };
  const { urlPathname } = pageContext;
  const { lang } = pageContext.routeParams as { lang: string };

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
        <div>
          <A href="/" lang="en">
            <strong>En</strong>
          </A>
          {' / '}
          <A href="/" lang="ru">
            <strong>Ru</strong>
          </A>
        </div>
        {Object.entries(sitemap).map(([doc, chapters]) => {
          const isManifesto = doc === 'manifesto' || doc === 'edict';
          const isCurrentDoc = doc === currentDoc;
          return (
            <div key={doc}>
              <strong>
                <A href={`/${doc}/`}>
                  {doc == 'rfc' ? 'RFCs' : doc.charAt(0).toUpperCase() + doc.slice(1)}
                </A>
              </strong>
              {isManifesto && (
                <>
                  {': '}
                  {chapters.map((chapter: Chapter, index: number) => (
                    <span key={chapter.id}>
                      <A href={chapter.url}>{chapter.name}</A>
                      {index < chapters.length - 1 && ',  '}
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
