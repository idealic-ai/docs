import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaid';
import rehypeRewrite from 'rehype-rewrite';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export async function processMarkdown(markdownContent: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeGithubAlerts)
    .use(rehypeSlug)
    .use(rehypeMermaid)

    .use(rehypeRewrite, {
      rewrite: (node, index, parent) => {
        if (node.type === 'element' && node.tagName === 'blockquote') {
          const p = node.children.find(child => child.type === 'element' && child.tagName === 'p');

          if (p && p.type === 'element') {
            const textNode = p.children.find(
              child => child.type === 'text' && child.value.trim().startsWith('Sidenote:')
            );

            if (textNode && textNode.type === 'text') {
              node.tagName = 'div';
              if (!node.properties) {
                node.properties = {};
              }
              node.properties.className = 'marginnote';
              node.properties.tabIndex = -1;
              textNode.value = textNode.value.replace(/^Sidenote:\s*/, '');
              if (!textNode.value.trim()) {
                if (p.children.length === 1) {
                  node.children.splice(node.children.indexOf(p), 1);
                } else {
                  p.children.splice(p.children.indexOf(textNode), 1);
                }
              }

              if (parent && typeof index === 'number') {
                let prevElementIndex = -1;
                for (let i = index - 1; i >= 0; i--) {
                  if (parent.children[i].type === 'element') {
                    prevElementIndex = i;
                    break;
                  }
                }

                if (prevElementIndex !== -1) {
                  const prevElement = parent.children[prevElementIndex];
                  const blockTags = [
                    'p',
                    'li',
                    'ul',
                    'ol',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'div',
                    'blockquote',
                    'table',
                    'figure',
                  ];

                  if (
                    prevElement &&
                    prevElement.type === 'element' &&
                    blockTags.includes(prevElement.tagName)
                  ) {
                    node.properties['data-anchor'] = prevElement.tagName;
                    parent.children[prevElementIndex] = node;
                    parent.children[index] = prevElement;
                  } else {
                    parent.children.splice(index, 1);
                    parent.children.unshift(node);
                  }
                } else {
                  parent.children.splice(index, 1);
                  parent.children.unshift(node);
                }
              }
            }
          }
        }

        // wrap tables in figure tags
        if (
          node.type === 'element' &&
          node.tagName === 'table' &&
          parent &&
          typeof index === 'number'
        ) {
          const newNode = {
            type: 'element',
            tagName: 'figure',
            properties: { class: 'fullwidth' },
            children: [node],
          };
          // @ts-ignore
          parent.children[index] = newNode;
        }
      },
    })
    .use(rehypeStringify)
    .process(markdownContent);

  const htmlContent = String(file);

  return htmlContent;
}

export function replaceRelativeLinks(
  markdownContent: string,
  baseUrl: string,
  lang: string
): string {
  // This regex finds markdown links that are relative.
  // It avoids absolute URLs (http, https, //), root-relative URLs (/), and anchor links (#).
  const relativeLinkRegex = /\[([^\]]+)\]\((?!https?:\/\/|\/\/|\/|#)([^)]+)\)/g;

  return markdownContent.replace(relativeLinkRegex, (match, linkText, linkUrl) => {
    // Prepend the baseUrl to the relative link.
    const cleanedLinkUrl = linkUrl.replace(/^\.\//, ''); // remove leading ./
    const finalBaseUrl = `/${baseUrl.replace(/^\/|\/$/g, '')}`;
    const absoluteUrl = `/docs/${lang}${finalBaseUrl}/${cleanedLinkUrl}`;
    return `[${linkText}](${absoluteUrl})`;
  });
}
