import type { PageContext } from 'vike/types';

export { route };

function route(pageContext: PageContext) {
  // Match the root path
  if (pageContext.urlPathname === '/' || pageContext.urlPathname === '') {
    return {
      routeParams: {},
    };
  }
  return false;
}
