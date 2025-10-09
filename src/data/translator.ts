import { Request } from '@augceo/agent';
import '@augceo/agent/provider/vertexai';
import dotenv from 'dotenv';
import { Language } from '../utils/languages';
dotenv.config();

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

async function translateELI5(documentContent: string, targetLang: Language): Promise<string> {
  const languageMap: Record<string, string> = {
    'eli5-en': 'English',
    'eli5-ru': 'Russian',
  };

  const systemPrompt = `
You are an expert at explaining complex technical concepts to a non-technical audience. Your task is to translate and simplify a markdown document into ${
    languageMap[targetLang]
  }, as if you were explaining it to a 12-year-old.

You must follow these core principles:
- **Simplify, but don't dumb down:** The user is intelligent and curious, but lacks technical jargon. Break down complex ideas into their essential parts without losing the core meaning.
- **Use powerful metaphors:** Create relatable analogies and metaphors to explain abstract concepts. For example, instead of talking about "stateless architecture," you could say, "It's like a vending machine – it doesn't remember who you are, it just gives you what you ask for each time."
- **Maintain accuracy:** Your explanation must be truthful. Do not compromise on the facts or mislead the user for the sake of simplicity.
- **Be engaging and encouraging:** Write in a friendly, approachable tone that sparks curiosity and makes the user feel capable of understanding. Your goal is to empower them with knowledge.

**Style Example:**
---
**Original:**
A Vibe is the fundamental unit of interaction and knowledge in our system. The core of \`Request\` is its \`schema\`
---
**Translated (Russian ELI5):**
Представь, что Vibe — это как LEGO-кирпичик для наших идей. Это самая маленькая, но самая важная часть, из которой мы строим всё остальное. У каждого кирпичика есть инструкция (мы называем её \`schema\`), которая говорит, какой он формы и как его можно использовать.
---

Now, translate and simplify the following document.
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
  * When translating tech terms like Instancing, prefer to translate them as one word. Latinisms are fine, like Инстансинг,
  * Concept / Latent can't be properly translated to russian, so we name it "Концепция / Скрытое" (fine as one word), but elsewhere say скрытое состояние, скрытое исполнение
  * Main titles in the documents need to be translated, e.g. Agent: Request -> Агент: Запрос
  *
  * Edict -> Эдикт
  * Blueprint -> Черновик
  * Roadmap -> План
  *
  * Dont translate [!WARNING]-like tags, just translate the text next to it

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
  if (lang === 'simple-en' || lang === 'simple-ru') {
    return await translateELI5(content, lang);
  }
  return await translateDocument(content, lang === 'ru' ? 'Russian' : 'English', extraPrompt);
}
