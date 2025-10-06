import type { PageContext } from 'vike/types';

export { route };

function route(pageContext: PageContext) {
  // For standalone docs repository, no need to strip base path
  const path = pageContext.urlPathname;

  const parts = path.split('/');

  // Check if this is a chapter route
  if (parts[1] !== 'chapter') {
    return false;
  }

  // Extract chapter name (required)
  const chapterName = parts[2];
  if (!chapterName) {
    return false;
  }

  // Extract subtype (optional)
  const subtype = parts[3];

  return {
    routeParams: {
      chapterName,
      ...(subtype ? { subtype } : {}),
    },
  };
}
