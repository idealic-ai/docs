import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';

export function A({
  href,
  lang,
  children,
  ...props
}: {
  lang?: string;
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const pageContext = usePageContext();
  const linkLang = lang || (pageContext.routeParams as { lang: string }).lang || 'en';
  const newHref = `/${linkLang}${href.startsWith('/') ? '' : '/'}${href}`;

  const { urlPathname } = pageContext;
  const isActive = href === '/' ? urlPathname === newHref : urlPathname.startsWith(newHref);

  return (
    <a href={`/docs${newHref}`} {...props} className={isActive ? 'is-active' : undefined}>
      {children}
    </a>
  );
}
