import { usePageContext } from 'vike-react/usePageContext';
import { A } from '../../components/A';
import { Chapter } from '../../data/sitemap';
import { UIStrings } from '../../data/ui';

interface PageData {
  content: string | null;
  rawUrl: string | null;
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
  ui: UIStrings;
}

export default function Page() {
  const pageContext = usePageContext();
  const { document } = pageContext.routeParams as { document: string };
  const { content, rawUrl, nextChapter, prevChapter, ui } = (pageContext.data as PageData) || {
    content: null,
  };

  const docStrings = ui ? ui[document as keyof UIStrings] : null;

  const copyRaw = async () => {
    if (!rawUrl) return;
    try {
      const response = await fetch(rawUrl);
      if (!response.ok) throw new Error('Failed to fetch raw content');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (e) {
      console.error(e);
      alert('Failed to copy raw content');
    }
  };

  return (
    <article>
      {content ? (
        <>
          <nav className="pagination top">
            {prevChapter ? (
              <A href={prevChapter.url} className="prev">
                &larr; {prevChapter?.numberStr}: {prevChapter.name}
              </A>
            ) : (
              <span />
            )}
            {nextChapter ? (
              <A href={nextChapter.url} className="next">
                {nextChapter.numberStr}: {nextChapter.name} &rarr;
              </A>
            ) : (
              <span />
            )}
          </nav>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <A href={`/${document}/`} className="back-link">
              <span>{docStrings?.toc_link}</span>
            </A>
            <button
              onClick={copyRaw}
              className="copy-button"
              style={{
                cursor: 'pointer',
                background: 'none',
                border: '1px solid currentColor',
                padding: '0.2em 0.5em',
                fontSize: '0.8em',
              }}
            >
              Copy Raw
            </button>
          </div>
          <section dangerouslySetInnerHTML={{ __html: content }} />
          <nav className="pagination top">
            {prevChapter ? (
              <A href={prevChapter.url} className="prev">
                &larr; {prevChapter?.numberStr}: {prevChapter.name}
              </A>
            ) : (
              <span />
            )}
            {nextChapter ? (
              <A href={nextChapter.url} className="next">
                {nextChapter.numberStr}: {nextChapter.name} &rarr;
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
