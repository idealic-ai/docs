import { usePageContext } from 'vike-react/usePageContext';
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
          <a href={`/docs/${document}/`} className="back-link">
            &larr;{' '}
            <span>
              Back to{' '}
              {document == 'rfc'
                ? 'list of RFCs'
                : document.charAt(0).toUpperCase() + document.slice(1)}{' '}
              table of contents
            </span>
          </a>
          <section dangerouslySetInnerHTML={{ __html: content }} />
          <nav className="pagination">
            {prevChapter ? (
              <a href={'/docs' + prevChapter.url} className="prev">
                &larr; {prevChapter.name}
              </a>
            ) : (
              <span />
            )}
            {nextChapter ? (
              <a href={'/docs' + nextChapter.url} className="next">
                {nextChapter.name} &rarr;
              </a>
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
