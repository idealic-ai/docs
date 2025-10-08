import { Request } from '@augceo/agent';
import { FromSchema } from '@augceo/schemistry';

const TranslationResponseSchema = {
  type: 'object',
  properties: {
    translation: {
      type: 'string',
      description: 'The translated and simplified markdown content.',
    },
  },
  unevaluatedProperties: false,
} as const;

interface StyleExample {
  original: string;
  translated: string;
}

/**
 * Translates and simplifies a markdown document using an LLM.
 *
 * @param documentContent The markdown content to translate.
 * @param styleExample An example of an original and translated document for style guidance.
 * @param targetLang The target language (e.g., "Russian").
 * @param extraPrompt An optional extra prompt for simplification or other transformations.
 * @returns The translated and simplified markdown content.
 */
export async function translateDocument(
  documentContent: string,
  styleExample: StyleExample,
  targetLang: string = 'Russian',
  extraPrompt?: string
): Promise<string> {
  const systemPrompt = `You are an expert translator and content localizer. Your task is to translate a markdown document into ${targetLang}, simplifying the language for a broad audience. You must follow the style of the provided example.

  **Style Example:**
  ---
  **Original:**
  ${styleExample.original}
  ---
  **Translated:**
  ${styleExample.translated}
  ---

  Now, translate and simplify the following document. ${
    extraPrompt ? `Additionally, apply the following instruction: "${extraPrompt}"` : ''
  }
  `;

  const response = await Request<
    typeof TranslationResponseSchema,
    FromSchema<typeof TranslationResponseSchema>
  >(
    {
      provider: 'vertexai',
      model: 'gemini-2.5-pro-preview-05-06',
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
    return response;
  }

  throw new Error('Failed to get a valid translation from the AI.');
}
