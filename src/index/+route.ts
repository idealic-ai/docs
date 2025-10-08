import type { PageContext } from 'vike/types';

export { route };

function route(pageContext: PageContext) {
  const match = pageContext.urlPathname.match(/^\/(en|ru)$/);
  if (match) {
    return {
      routeParams: {
        lang: match[1],
      },
    };
  }
  return false;
}
