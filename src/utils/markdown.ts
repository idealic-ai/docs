import { marked } from 'marked';

export async function processMarkdown(markdownContent: string): Promise<string> {
  let htmlContent = await Promise.resolve(marked.parse(markdownContent));

  // Wrap tables in figure tags
  htmlContent = htmlContent.replace(/<table>/g, '<figure><table>');
  htmlContent = htmlContent.replace(/<\/table>/g, '</table></figure>');

  return htmlContent;
}
