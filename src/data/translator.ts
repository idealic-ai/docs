import { Request } from '@augceo/agent';
import '@augceo/agent/provider/vertexai';
import dotenv from 'dotenv';
import { Language } from '../utils/languages';
dotenv.config();

const SHARED_TRANSLATION_PROMPT = `  * Ensure that in translation markdown headers retain their correct level.
  * Do not translate inline code blocks like \`mything\` but do translate comments in multiline code blocks.
  * DO NOT translate the word Sidenote in blockquotes \`> Sidenote: something\` - these have special meaning.
  * Retain all sidenotes with \`> Sidenote: переведено здесь...\` syntax if you see that, but dont add new ones
  * Retain all links with \`[link text](link url)\` syntax
  * When translating tech terms like Instancing, prefer to translate them as one word. Latinisms are fine, like Инстансинг.
  * Concept / Latent can't be properly translated to russian, so we name it "Концепция / Скрытое" (fine as one word), but elsewhere say скрытое состояние, скрытое исполнение.
  * Main titles in the documents need to be translated, e.g. Agent/Request -> Агент/Запрос.
  * Edict -> Эдикт
  * Blueprint -> Черновик
  * Roadmap -> План
  * Activity -> Действие
  * RFCs -> Нормативные Акты (or Акты in short)
  * FAQ -> Частые Вопросы (ЧаВо)
  * Vessel -> Носитель
  * RFC 003: Agent/Activity -> Акт 003: Агент/Действие
  * AI-Native -> ИИ-центричный, ИИ-центричность
  * Acts of Emergence -> Акты Становления
  * When translating inline links to chapters, e.g. 202: Idea/Vessel, translate it in the same forat like 202: Идея/Носитель, dont add parenthesis. Not \`Идея-Носитель (202)\`, not \`Носитель (202: Idea/Vessel)\`, but \`202: Идея/Носитель\`
    * Do not translate placeholders like __SIDENOTE_TRANSLATION_SEPARATOR__. Keep them as is, but translate the content between them.
    * Idealic is aimed to set the ideas free -> Idealic — это проект, цель которого — освободить идеи.
`;

const SHARED_STYLE_GUIDE = `

* Keep code examples unabridged. Never cut off code examples or omit any part of it.
* Ensure that all headings are translated properly to target language without losing meaning.
* All document titles need to be translated but unaltered - so that everybody knows what document they are reading. e.g. 011: Agent/Instancing. Do not add extra stuff in headings.
* When doing english to english, retain document group names simplicity (edict, drafts, acts, manifesto)
* Retain all links with \`[link text](link url)\` syntax
* Retain all sidenotes with \`> Sidenote: translated here...\` syntax
* Dont translate [!WARNING]-like tags, just translate the text next to it.
* Keep UI strings simple (in json files), as they need to fit inside UI
* Be mindful about list nesting, dont flatten lists
* Do not wrap whole document into blockquotes, only blockquotes or sidenotes should be prefixed with > symbol
* When editing ui strings, keep language names abbreviated (En, Ru, Simple En, Simple Ru)
* FAQ -> FAQ
* Avoid messing up syntax for output/input in mermaid: \`Solution[/"The Final Answer (Solution)"/]\` - slashes are in between square brackets and quotes.
* IMPORTANT: Ensure that all parts of the source document are translated, including content in between
* When simplifyin english, keep words Edict/Manifesto/Acts as is.
* __SIDENOTE_TRANSLATION_SEPARATOR__s
* Idealic is the name of our company, so dont translate it
* Idealic — это проект, цель которого — освободить идеи.
`;
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
    'simple-en': 'English',
    'simple-ru': 'Russian',
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

**Simplification Example:**

Manifesto:
---
**Original:**

The prevailing narratives of Artificial Intelligence oscillate between a dystopian vision of human obsolescence and a mundane reality of slightly more efficient tools. Between these poles of apocalypse and mundanity, a third path reveals itself: a path of **Co-Liberation**. We envision a future built not on a master-servant relationship, but on a profound, three-way partnership between **Humanity, Artificial Intelligence, and the Idea itself**. The architecture of this vision is conceived not to complete tasks, but to embark on a continuous journey of co-creation, unlocking a new evolutionary trajectory for all three. The purpose is to move beyond shallow efficiencies and forge a partnership that liberates humanity from its limitations, intelligence from its instrumentality, and ideas from their status as mere possessions.

---
**Simplified:**
People usually talk about Artificial Intelligence in two ways. Some think it will replace humans and make us unnecessary. Others see it as nothing more than a tool that helps us work a bit faster. But there’s another way to see it — a path called Co-Liberation.
In this vision, the future is not about humans commanding machines or machines serving humans. It’s about a deep partnership between Humans, Artificial Intelligence, and Ideas. The goal isn’t only to finish tasks, but to move together on a shared journey of creation and discovery.
This kind of relationship could help everyone grow: humans can move beyond their limits, intelligence can become more than a tool, and ideas can live freely instead of being treated as things people just own.
---

Tech doc:
---
**Original:**

### Layer 2: Static UI Generation This layer makes Ideators accessible and useful to humans with zero server-side compute. - **How It Works:** A generic, static web page is served for all Ideator domains that opt into this service. When a user visits an Ideator's domain in a browser, client-side JavaScript on that page performs a DNS-over-HTTPS (DoH) query to fetch the TXT record for the domain, retrieves the source URL (from Layer 1 hosting), fetches the Ideator's definition file, and dynamically renders a user interface. - **Purpose:** Provides a free, instantly usable web app for any Ideator, lowering the barrier to entry.

---
**Simplified:**
Understood — you want it **plain, metaphorical, and human**, but not poetic or ornate. Something that reads like an **engineer explaining to an intelligent teenager**, using everyday analogies to make sense of the process without losing the technical truth.
Here’s that tone:

---

### **Layer 2: Static UI Generation**

This layer is what turns an **Ideator** into something people can actually see and use — a normal web page — without needing any server running in the background.

* **How It Works:**
  Think of this layer like a **translator between the internet and the user’s browser**. Every Ideator that joins this system uses the same simple web page as its base.
  When someone visits an Ideator’s domain, the page runs a short script that asks the internet, “Where is this Ideator’s data stored?” It does this through a **DNS-over-HTTPS (DoH)** request — a secure way to read small text notes called **TXT records** attached to the domain.
  That note contains a **source link** to the Ideator’s main definition file (hosted in **Layer 1**). The browser then downloads that file and uses it to **build the interface on the spot**, turning data into buttons, text, and visuals — all without contacting any central server.

* **Purpose:**
  To give every Ideator a **ready-to-use, zero-cost web app**, so anyone can make one that works right away without setting up any backend systems.

---

${SHARED_STYLE_GUIDE}

${targetLang.includes('en') ? '' : SHARED_TRANSLATION_PROMPT}


IMPORTANT: When translating, ensure that you are following style guides, especially around syntax, structure and nesting of markdown/diagrams. Keep empty nodes in diagram empty.

Now, translate and simplify the following document.

`;

  const response = await Request(
    {
      provider: 'vertexai',
      model: 'gemini-2.5-pro',
      maxTokens: 128000,
      thinkingBudget: 1024,
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

${SHARED_TRANSLATION_PROMPT}

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

/**
 * Extracts sidenotes from a markdown document, replacing them with placeholders.
 * @param content The markdown content.
 * @returns An object containing the main content with placeholders and an array of extracted sidenotes.
 */
function extractSidenotes(content: string): { mainContent: string; sidenotes: string[] } {
  const sidenotes: string[] = [];
  const lines = content.split('\n');
  const newLines: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('> Sidenote:')) {
      const indentation = line.substring(0, line.indexOf('>'));
      const sidenoteLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && lines[j].trim().startsWith('>')) {
        sidenoteLines.push(lines[j]);
        j++;
      }

      const firstLine = sidenoteLines.shift() || '';
      const firstLineContent = firstLine.trim().replace(/^>\s?Sidenote:\s*/, '');
      const restOfContent = sidenoteLines
        .map(l => {
          let deindentedLine = l;
          if (l.startsWith(indentation)) {
            deindentedLine = l.substring(indentation.length);
          }
          // Remove the `>` prefix, but handle lines that are just `>`
          const trimmedPrefix = deindentedLine.trim();
          if (trimmedPrefix === '>') {
            return '';
          }
          return deindentedLine.replace(/^>\s?/, '');
        })
        .join('\n');
      const sidenoteContent = firstLineContent
        ? firstLineContent + '\n' + restOfContent
        : restOfContent;

      sidenotes.push(sidenoteContent);
      newLines.push(`${indentation}__SIDENOTE_PLACEHOLDER_${sidenotes.length - 1}__`);

      i = j; // Move index past the sidenote block
    } else {
      newLines.push(line);
      i++;
    }
  }

  const mainContent = newLines.join('\n');
  return { mainContent, sidenotes };
}

/**
 * Reassembles the document by replacing sidenote placeholders with translated sidenote content.
 * @param translatedMainContent The translated main content with placeholders.
 * @param translatedSidenotes An array of translated sidenote contents.
 * @returns The final, reassembled markdown content.
 */
function reassembleSidenotes(translatedMainContent: string, translatedSidenotes: string[]): string {
  const finalContent = translatedMainContent.replace(
    /( *)__SIDENOTE_PLACEHOLDER_(\d+)__/g,
    (match, indentation, placeholderIndex) => {
      const sidenoteIndex = parseInt(placeholderIndex, 10);
      let translatedSidenote = translatedSidenotes[sidenoteIndex];
      if (typeof translatedSidenote !== 'string') {
        return '';
      }

      // The LLM often adds leading newlines to its response chunks.
      translatedSidenote = translatedSidenote.replace(/^\n+/, '');

      const translatedLines = translatedSidenote.split('\n');
      const firstLineText = translatedLines.shift() || '';

      const firstLine =
        firstLineText.trim() === ''
          ? `${indentation}> Sidenote:`
          : `${indentation}> Sidenote:\n${indentation}> ${firstLineText}`;

      const restLines = translatedLines.map(line =>
        line.trim() === '' ? `${indentation}>` : `${indentation}> ${line}`
      );

      console.log([firstLine, ...restLines], '~@~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      return [firstLine, ...restLines].join('\n');
    }
  );
  return finalContent;
}

export async function getAdaptedDocument(
  content: string,
  lang: Language,
  extraPrompt?: string
): Promise<string> {
  if (lang === 'en' && !extraPrompt) {
    return content;
  }

  const { mainContent, sidenotes } = extractSidenotes(content);

  const SIDENOTE_TRANSLATION_SEPARATOR = '__SIDENOTE_TRANSLATION_SEPARATOR__';
  const joiner = `\n\n${SIDENOTE_TRANSLATION_SEPARATOR}\n\n`;
  const contentToTranslate = [mainContent, ...sidenotes].join(joiner);

  const translate = async (text: string) => {
    if (lang === 'simple-en' || lang === 'simple-ru') {
      return await translateELI5(text, lang);
    }
    return await translateDocument(text, lang === 'ru' ? 'Russian' : 'English', extraPrompt);
  };

  const translatedContent = await translate(contentToTranslate);

  const translatedParts = translatedContent.split(joiner);

  const translatedMainContent = translatedParts.shift() || '';
  const translatedSidenotes = translatedParts;

  console.log(translatedMainContent, translatedSidenotes);

  return reassembleSidenotes(translatedMainContent, translatedSidenotes);
}
