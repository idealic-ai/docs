import octicons from '@primer/octicons';
import { h } from 'hastscript';
import { Root } from 'mdast';
import rehypeCallouts from 'rehype-callouts';
import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaid';
import rehypeRewrite from 'rehype-rewrite';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import rehypeDirectiveRehype from 'remark-directive-rehype';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
export async function processMarkdown(markdownContent: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(rehypeDirectiveRehype)
    .use(myRemarkPlugin)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeCallouts, {
      callouts: {
        NOTE: {
          indicator: `<svg class="octicon octicon-info" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">${String(
            octicons['info'].heights[16]?.path
          )}</svg>`,
          title: 'Note',
        },
        IMPORTANT: {
          indicator: `<svg class="octicon octicon-report" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">${String(
            octicons['report'].heights[16]?.path
          )}</svg>`,
          title: 'Important',
        },
        WARNING: {
          indicator: `<svg class="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">${String(
            octicons['alert'].heights[16]?.path
          )}</svg>`,
          title: 'Warning',
        },
        TIP: {
          indicator: `<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">${String(
            octicons['light-bulb'].heights[16]?.path
          )}</svg>`,
          title: 'Tip',
        },
        CAUTION: {
          indicator: `<svg class="octicon octicon-stop" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">${String(
            octicons['stop'].heights[16]?.path
          )}</svg>`,
          title: 'Caution',
        },
        HEADSUP: {
          indicator: `<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">${String(
            octicons['mortar-board'].heights[16]?.path
          )}</svg>`,
          title: 'Heads up',
        },
        DEFINITION: {
          indicator: `<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">${String(
            octicons['book'].heights[16]?.path
          )}</svg>`,
          title: 'Definition',
        },
      },
    })
    .use(rehypeSlug)
    //    .use(rehypeCodeLanguageLabels)
    .use(rehypeMermaid, {
      mermaidConfig: {
        theme: 'neutral',
        themeVariables: {
          secondaryColor: '#006100',
          titleColor: '#999',
        },
        flowchart: {
          subGraphTitleMargin: {
            top: 5,
            bottom: 10,
          },
          curve: 'basis',
          useWidth: 200,
        },
      },
    })

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
  const relativeLinkRegex = /\[([^\]]+)\]\((?!<?https?:\/\/|\/\/|\/|#)([^)]+)\)?\)/g;

  return markdownContent.replace(relativeLinkRegex, (match, linkText, linkUrl) => {
    // Prepend the baseUrl to the relative link.
    const cleanedLinkUrl = linkUrl.replace(/^\.\//, ''); // remove leading ./
    const finalBaseUrl = `/${baseUrl.replace(/^\/|\/$/g, '')}`;
    const absoluteUrl = `${process.env.VITE_BASE_PATH || ''}/${lang}${finalBaseUrl}/${cleanedLinkUrl}`;
    return `[${linkText}](${absoluteUrl})`;
  });
}

// This plugin is an example to turn `::block` into divs,
// passing arbitrary attributes.
function myRemarkPlugin() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return (tree: Root) => {
    visit(tree, node => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name === 'columns') {
          const data = node.data || (node.data = {});
          const tagName = node.type === 'textDirective' ? 'span' : 'div';
          (node.attributes ||= {}).className = 'columns';

          data.hName = tagName;
          data.hProperties = h(tagName, node.attributes || {}).properties;
        } else if (node.name == 'column') {
          const data = node.data || (node.data = {});
          const tagName = node.type === 'textDirective' ? 'span' : 'div';
          (node.attributes ||= {}).className = 'column';

          if (node.attributes.title) {
            node.children.unshift({
              // @ts-ignore not sure why this is not supported
              type: 'literal',
              data: {
                hName: 'h4',
              },
              value: node.attributes.title,
            });
          }

          data.hName = tagName;
          data.hProperties = h(tagName, node.attributes || {}).properties;
        }
      }
    });
  };
}
