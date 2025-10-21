import { Glossary, GlossaryEntry } from '../data/sitemap';

function findGlossaryEntry(term: string, glossary: Glossary): GlossaryEntry | undefined {
  // 1. Direct match
  if (glossary[term]) {
    return glossary[term];
  }

  // 2. Plural match (e.g. "Calls" -> "Call", "Activities" -> "Activity")
  let singularTerm = term;
  if (term.endsWith('ies')) {
    singularTerm = term.slice(0, -3) + 'y';
  } else if (term.endsWith('es')) {
    singularTerm = term.slice(0, -2);
  } else if (term.endsWith('s')) {
    singularTerm = term.slice(0, -1);
  }

  if (term !== singularTerm && glossary[singularTerm]) {
    return glossary[singularTerm];
  }

  // 3. First word fall back match (e.g. "Variable" -> "Variable Reference")
  const glossaryKeys = Object.keys(glossary);
  const matchingKey = glossaryKeys.find(
    key => key.startsWith(term) || key.startsWith(singularTerm)
  );
  if (matchingKey) {
    return glossary[matchingKey];
  }

  const matchingKeyEnd = glossaryKeys.find(key => term.endsWith(key) || singularTerm.endsWith(key));
  if (matchingKeyEnd) {
    return glossary[matchingKeyEnd];
  }
  return undefined;
}

export function linkGlossaryTerms(content: string, glossary: Glossary, lang: string): string {
  const termRegex = /:term\[([^\]]+?)\](?:\{([^}]+?)\})?/g;

  return content.replace(termRegex, (match, text, attrsStr) => {
    const attrs: Record<string, string> = {};
    if (attrsStr) {
      const attrRegex = /(\w+)="([^"]*)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
        attrs[attrMatch[1]] = attrMatch[2];
      }
    }

    const canonical = attrs.canonical || text;
    const glossaryEntry = findGlossaryEntry(canonical, glossary);
    if (glossaryEntry) {
      const basePath = lang === 'en' ? '' : `/${lang}`;
      const newAttrs = {
        ...attrs,
        href: glossaryEntry.url
          ? `${basePath}${glossaryEntry.url.replace('./', '')}`
          : `${basePath}/acts/000_glossary.md#${glossaryEntry.slug}`,
        canonical: glossaryEntry.canonical,
      };

      const attrsString = Object.entries(newAttrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      return `:term[${text}]{${attrsString}}`;
    }

    return match;
  });
}
