import type { PageContext } from 'vike/types';
import { LANGUAGES } from '../utils/languages';

export { route };

function route(pageContext: PageContext) {
  const langPattern = `(${LANGUAGES.join('|')})`;
  const regex = new RegExp(`^/${langPattern}/?$`);
  const match = pageContext.urlPathname.match(regex);
  if (match) {
    return {
      routeParams: {
        lang: match[1],
      },
    };
  }
  return false;
}
