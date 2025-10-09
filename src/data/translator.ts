import { Request } from '@augceo/agent';
import '@augceo/agent/provider/vertexai';
import dotenv from 'dotenv';
dotenv.config();

export const LANGUAGES = ['en', 'ru'] as const;
export type Language = (typeof LANGUAGES)[number];

const TranslationResponseSchema = {
  type: 'object',
  properties: {
    translation: {
      type: 'string',
      description: 'The translated and simplified markdown content.',
    },
  },
  required: ['translation'],
  unevaluatedProperties: false,
} as const;

export const STYLE_EXAMPLE = {
  original: `A Vibe is the fundamental unit of interaction and knowledge in our system. The core of \`Request\` is its \`schema\``,
  translated: `Vibe — это фундаментальная единица взаимодействия и знаний в нашей системе. Основой \`Request\` является его \`schema\``,
};

/**
 * Translates and simplifies a markdown document using an LLM.
 *
 * @param documentContent The markdown content to translate.
 * @param styleExample An example of an original and translated document for style guidance.
 * @param targetLang The target language (e.g., "Russian").
 * @param extraPrompt An optional extra prompt for simplification or other transformations.
 * @returns The translated and simplified markdown content.
 */
async function translateDocument(
  documentContent: string,
  targetLang: string = 'Russian',
  extraPrompt?: string
): Promise<string> {
  const systemPrompt = `You are an expert translator and content localizer. Your task is to translate a markdown document into ${targetLang}, simplifying the language for a broad audience. You must follow the style of the provided example.

  * Do not translate inline code blocks like \`mything\` by do translate comments in multiline code blocks.
  * DO NOT translate the word Sidenote in blockquotes \`> Sidenote: something\` - these have special meaning

  **Style Example:**
  ---
  **Original:**
  ${STYLE_EXAMPLE.original}
  ---
  **Translated:**
  ${STYLE_EXAMPLE.translated}
  ---

  Now, translate and simplify the following document. ${
    extraPrompt ? `Additionally, apply the following instruction: "${extraPrompt}"` : ''
  }
  `;

  const response = await Request(
    {
      provider: 'vertexai',
      model: 'gemini-2.5-pro',
      apiKey: process.env.VERTEXAI_API_KEY,
    },
    TranslationResponseSchema,
    [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: documentContent,
      },
    ]
  );

  if (response) {
    return response[0].translation;
  }

  throw new Error('Failed to get a valid translation from the AI.');
}

export async function getAdaptedDocument(
  content: string,
  lang: Language,
  extraPrompt?: string
): Promise<string> {
  if (lang === 'en' && !extraPrompt) {
    return content;
  }
  return await translateDocument(content, lang === 'ru' ? 'Russian' : 'English', extraPrompt);
}
