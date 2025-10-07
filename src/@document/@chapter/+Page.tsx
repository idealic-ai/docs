import { usePageContext } from 'vike-react/usePageContext';

interface PageData {
  content: string | null;
}

export default function Page() {
  const pageContext = usePageContext();
  const { document } = pageContext.routeParams as { document: string };
  const { content } = (pageContext.data as PageData) || { content: null };

  return (
    <article>
      {content ? (
        <section dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <section>
          <h1>{document.charAt(0).toUpperCase() + document.slice(1)}</h1>
          <p>Select a part from the navigation above to begin reading.</p>
        </section>
      )}
    </article>
  );
}
