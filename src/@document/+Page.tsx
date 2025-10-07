import { usePageContext } from 'vike-react/usePageContext';

interface PageData {
  content: string;
  title: string;
}

export default function Page() {
  const pageContext = usePageContext();
  const { content, title } = pageContext.data as PageData;

  return (
    <article>
      <section dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
