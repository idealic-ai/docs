import { useData } from 'vike-react/useData';

export default function Page() {
  const { content } = useData<{ content: string }>();
  return (
    <main>
      <article>
        <section dangerouslySetInnerHTML={{ __html: content }}></section>
      </article>
    </main>
  );
}
