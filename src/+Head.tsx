// https://vike.dev/Head
import { useData } from 'vike-react/useData';
import logoUrl from './assets/symbol.svg';

export default function HeadDefault() {
  const { title, description } = useData<{ title: string; description: string }>();

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <link rel="icon" href={logoUrl} />
      <title>{title}</title>
    </>
  );
}
