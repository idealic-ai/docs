import { usePageContext } from 'vike-react/usePageContext';
import { A } from '../../components/A';
import { Chapter } from '../../data/sitemap';
import { UIStrings } from '../../data/ui';

interface PageData {
  content: string | null;
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
  ui: UIStrings;
}

export default function Page() {
  const pageContext = usePageContext();
  const { document } = pageContext.routeParams as { document: string };
  const { content, nextChapter, prevChapter, ui } = (pageContext.data as PageData) || {
    content: null,
  };

  const docStrings = ui ? ui[document as keyof UIStrings] : null;

  return (
    <article>
      {content ? (
        <>
          <nav className="pagination top">
            {prevChapter ? (
              <A href={prevChapter.url} className="prev">
                &larr; {prevChapter.name}
              </A>
            ) : (
              <span />
            )}
            {nextChapter ? (
              <A href={nextChapter.url} className="next">
                {nextChapter.name} &rarr;
              </A>
            ) : (
              <span />
            )}
          </nav>
          <A href={`/${document}/`} className="back-link">
            <span>{docStrings?.toc_link}</span>
          </A>
          <section dangerouslySetInnerHTML={{ __html: content }} />
          <nav className="pagination bottom">
            {prevChapter ? (
              <A href={prevChapter.url} className="prev">
                &larr; {prevChapter.name}
              </A>
            ) : (
              <span />
            )}
            {nextChapter ? (
              <A href={nextChapter.url} className="next">
                {nextChapter.name} &rarr;
              </A>
            ) : (
              <span />
            )}
          </nav>
        </>
      ) : (
        <section>
          <h1>{document.charAt(0).toUpperCase() + document.slice(1)}</h1>
          <p>Select a part from the navigation above to begin reading.</p>
        </section>
      )}
    </article>
  );
}
