import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { LANGUAGES } from '../utils/languages';

export function A({
  href,
  lang,
  children,
  className,
  ...props
}: {
  lang?: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  href = LANGUAGES.reduce((acc, lang) => {
    return acc.replace(`/${lang}/`, '/');
  }, href);
  const pageContext = usePageContext();
  const linkLang = lang || (pageContext.routeParams as { lang: string }).lang || 'en';
  const newHref = `/${linkLang}${href.startsWith('/') ? '' : '/'}${href}`;

  const { urlPathname } = pageContext;
  const isActive = href === '/' ? urlPathname === newHref : urlPathname.startsWith(newHref);

  return (
    <a
      href={`${process.env.VITE_BASE_PATH || ''}/${newHref}`}
      {...props}
      className={`${className} ${isActive ? 'is-active' : undefined}`}
    >
      {children}
    </a>
  );
}
