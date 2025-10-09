import type { PageContext } from 'vike/types';

export const LANGUAGES = ['en', 'ru'] as const;
export function route(pageContext: PageContext) {
  const langPattern = `/(${LANGUAGES.join('|')})`;
  const docPattern = `/(manifesto|rfc|blueprint|edict)/([^/]+)`;
  const regex = new RegExp(`^${langPattern}${docPattern}$`);
  const match = pageContext.urlPathname.match(regex);

  if (!match) {
    return false;
  }

  const lang = match[1];
  const document = match[2];
  const chapterSlug = match[3];

  return {
    routeParams: {
      lang,
      document,
      chapterSlug,
    },
  };
}
