import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeHighlight from 'rehype-highlight';
import rehypeRewrite from 'rehype-rewrite';
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
              textNode.value = textNode.value.replace(/^Sidenote:\s*/, '');
              if (!textNode.value.trim()) {
                node.children.splice(node.children.indexOf(p), 1);
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
