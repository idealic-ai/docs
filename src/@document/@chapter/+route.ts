import type { PageContext } from 'vike/types';

export function route(pageContext: PageContext) {
  const match = pageContext.urlPathname.match(
    /^\/(en|ru)\/(manifesto|rfc|blueprint|edict)\/([^/]+).md$/
  );

  if (!match) {
    return false;
  }

  return {
    routeParams: {
      lang: match[1],
      document: match[2],
      chapterSlug: match[3],
    },
  };
}
