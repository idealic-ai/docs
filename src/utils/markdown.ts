import { marked } from 'marked';
import markedFootnote from 'marked-footnote';

marked.use(markedFootnote());

export async function processMarkdown(markdownContent: string): Promise<string> {
  let htmlContent = await Promise.resolve(marked.parse(markdownContent));

  // Wrap tables in figure tags
  htmlContent = htmlContent.replace(/<table>/g, '<figure class="fullwidth"><table>');
  htmlContent = htmlContent.replace(/<\/table>/g, '</table></figure>');

  return htmlContent;
}
