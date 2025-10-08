import { usePageContext } from 'vike-react/usePageContext';
import { A } from '../../components/A';
import { Chapter } from '../../data/sitemap';

interface PageData {
  content: string | null;
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
}

export default function Page() {
  const pageContext = usePageContext();
  const { document } = pageContext.routeParams as { document: string };
  const { content, nextChapter, prevChapter } = (pageContext.data as PageData) || {
    content: null,
  };

  return (
    <article>
      {content ? (
        <>
          <A href={`/${document}/`} className="back-link">
            &larr;{' '}
            <span>
              Back to{' '}
              {document == 'rfc'
                ? 'list of RFCs'
                : document.charAt(0).toUpperCase() + document.slice(1)}{' '}
              table of contents
            </span>
          </A>
          <section dangerouslySetInnerHTML={{ __html: content }} />
          <nav className="pagination">
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
