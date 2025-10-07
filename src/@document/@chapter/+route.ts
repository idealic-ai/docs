import type { PageContext } from 'vike/types';

export function route(pageContext: PageContext) {
  const match = pageContext.urlPathname.match(/^\/(manifesto|rfc|blueprint|edict)\/([^/]+).md$/);
  console.log(match, pageContext.urlPathname);

  if (!match) {
    return false;
  }

  return {
    routeParams: {
      document: match[1],
      chapterSlug: match[2],
    },
  };
}
