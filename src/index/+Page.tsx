import { useData } from 'vike-react/useData';

export default function Page() {
  const { contentHtml } = useData<{ contentHtml: string }>();
  return (
    <main>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }}></section>
      </article>
    </main>
  );
}
