import { usePageContext } from 'vike-react/usePageContext';
import logo from '../assets/symbol.svg';
import '../assets/tufte.css';
import { A } from '../components/A';
import type { Chapter, Sitemap } from '../data/sitemap';
import type { UIStrings } from '../data/ui';
import { LANGUAGES } from '../utils/languages';

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const { sitemap, ui } = (pageContext.data as { sitemap: Sitemap; ui: UIStrings }) || {
    sitemap: {},
  };
  const { urlPathname } = pageContext;
  const { lang } = pageContext.routeParams as { lang: string };

  const pathParts = urlPathname.split('/').filter(Boolean);
  const currentDoc = pathParts[1];
  const currentSlug = pathParts[2];

  let currentChapter: Chapter | undefined;
  if (!sitemap) return <main>{children}</main>;

  if (currentDoc && sitemap[currentDoc]) {
    currentChapter = sitemap[currentDoc].find(c => c.slug === currentSlug);
  }

  return (
    <div>
      <header>
        <div className="logo">
          <A href="/">
            <img src={logo} alt="Logo" />
          </A>
        </div>
        <nav>
          {Object.entries(sitemap).map(([doc, chapters]) => {
            const isManifesto = doc === 'manifesto' || doc === 'edict';
            const isCurrentDoc = doc === currentDoc;
            const docStrings = ui ? ui[doc as keyof UIStrings] : null;
            return (
              <div key={doc}>
                <strong>
                  <A href={`/${doc}/`}>
                    {docStrings ? docStrings.short : doc.charAt(0).toUpperCase() + doc.slice(1)}
                  </A>
                </strong>
                {isManifesto && (
                  <>
                    {chapters.map((chapter: Chapter, index: number) => (
                      <span key={chapter.id} className="chapter-link">
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
        <div className="languages">
          {LANGUAGES.map(l => (
            <A
              href={pageContext.urlPathname}
              lang={l}
              className={l === lang ? 'is-active' : undefined}
            >
              <strong>{ui.nav[l as keyof typeof ui.nav] || l}</strong>
            </A>
          ))}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
