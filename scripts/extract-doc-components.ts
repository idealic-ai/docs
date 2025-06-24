#!/usr/bin/env node

import { Provider, Request } from '@augceo/agent';
import '@augceo/agent/provider/vertexai';
import { Command } from '@commander-js/extra-typings';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { glob } from 'glob';
import * as path from 'path';

/**
 * Script to extract components from markdown files and create test-oriented structure.
 *
 * This script:
 * 1. Scans all markdown files in the chapters directory (flat structure)
 * 2. For each chapter, creates a folder in compiled directory:
 *    - compiled/01.vibes/01.vibes.bible.md (human-readable content)
 *    - compiled/01.vibes/01.vibes.manifest.md (LLM-specific content)
 *    - compiled/01.vibes/01.vibes.questions.json (extracted questions)
 *    - compiled/01.vibes/01.vibes.test.ts (vitest test file)
 *    - compiled/01.vibes/01.vibes.md (source amalgamation)
 * 3. Also creates compiled/Bible.md and compiled/Manifest.md for full content
 */

// Types for extracted content
interface QuestionEntry {
  schema: {
    type: string;
    description: string;
    properties: {
      answer: {
        type: string;
        items: {
          type: string;
          enum: string[];
        };
      };
      interpretation: {
        description: string;
        type: string;
      };
      confusion: {
        description: string;
        type: string;
      };
      suggestions: {
        description: string;
        type: string;
      };
      breakdown: {
        description: string;
        type: string;
      };
      reasoning: {
        description: string;
        type: string;
      };
    };
    required: string[];
  };
  correctAnswers: string[];
}

interface LlmEntry {
  source: string;
  content: string;
}

interface ChapterContent {
  name: string;
  originalContent: string;
  cleanedMarkdown: string;
  questions: QuestionEntry[];
  llmSections: LlmEntry[];
  capturedDefinitions: string;
}

// Configuration - paths relative to docs folder
const SOURCE_DIR = 'chapters';
const OUTPUT_DIR = 'compiled';

/**
 * Convert a quiz block to JSON schema format
 * Example format:
 * ```question
 * What is the right answer?
 * * [x] Correct answer 1
 *    * [ ] Wrong answer 2
 *  * [x] Correct answer 3
 * ```
 */
function convertQuizToJson(quizContent: string): QuestionEntry {
  const lines = quizContent.trim().split('\n');

  // Extract question description (everything before the first bullet point)
  let description = '';
  let answerLines: string[] = [];

  let inAnswers = false;
  for (const line of lines) {
    // More flexible pattern for bullet points with varied whitespace
    if (line.trim().match(/^\s*\*\s*\[/)) {
      inAnswers = true;
      answerLines.push(line);
    } else if (!inAnswers) {
      description += line + ' ';
    }
  }

  description = description.trim();

  // Extract answer options and correct answers
  const answerOptions: string[] = [];
  const correctAnswers: string[] = [];

  answerLines.forEach(line => {
    // More flexible pattern for checked boxes that allows varied whitespace
    const isCorrect = line.match(/^\s*\*\s*\[\s*[xX]\s*\]/);
    // More flexible pattern for extracting answer text with varied whitespace
    const answerText = line.replace(/^\s*\*\s*\[\s*[xX]?\s*\]\s*/, '').trim();

    answerOptions.push(answerText);
    if (isCorrect) {
      correctAnswers.push(answerText);
    }
  });

  // Create JSON schema for the question without correct answers embedded
  return {
    schema: {
      type: 'object',
      description: `Question: ${description}`,
      properties: {
        answer: {
          type: 'array',
          items: {
            type: 'string',
            enum: answerOptions,
          },
        },
        interpretation: {
          description:
            'Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.',
          type: 'string',
        },
        reasoning: {
          description: 'Provide your thought process and rationale while answering the question.',
          type: 'string',
        },
        breakdown: {
          description:
            'Detail the reasoning for each option, explaining why it is correct or incorrect.',
          type: 'string',
        },
        confusion: {
          description: 'What is the source of your confusion?',
          type: 'string',
        },
        suggestions: {
          description:
            'What would you suggest to improve the question or in the chapter wrt to this question?',
          type: 'string',
        },
      },
      required: ['answer', 'reasoning', 'interpretation', 'breakdown', 'confusion', 'suggestions'],
    },
    correctAnswers,
  };
}

/**
 * Extract chapter name from filename (e.g., "01.vibes.md" -> "01.vibes")
 */
function getChapterName(filename: string): string {
  const baseName = path.basename(filename, '.md');
  return baseName;
}

/**
 * Generate TypeScript questions file with proper exports and as const
 */
function generateQuestionsFile(questions: QuestionEntry[]): string {
  const questionsObject = questions.reduce(
    (acc, question, index) => {
      acc[`Q${index + 1}`] = question;
      return acc;
    },
    {} as Record<string, QuestionEntry>
  );

  return `export const questions = ${JSON.stringify(questionsObject, null, 2)} as const;
`;
}

/**
 * Generates a simplified explanation of the provided content for a target audience using an LLM.
 */
async function generateAudienceTargetedExplanation(
  chapterName: string,
  audience: string,
  contentToSimplify: string,
  expertSystemPrompt: string,
  outputDir: string,
  extraPrompt?: string
): Promise<void> {
  console.log(
    `Generating simplified explanation for "${chapterName}" targeting audience: "${audience}"...`
  );

  const config = {
    provider: 'vertexai',
    model: 'gemini-2.5-pro-preview-05-06', //smarter model
    //model: 'gemini-2.0-flash', // Using the same model as tests for consistency
    project: process.env.VERTEXAI_PROJECT,
    location: process.env.VERTEXAI_LOCATION,
    temperature: 0.7, // Slightly higher temp might be good for creative simplification
    maxTokens: 40192, // Potentially longer output for full explanations
  } as const satisfies Provider.MinimalConfig;
  const simplificationSchema = {
    type: 'object',
    description: `Schema for the LLM to provide a simplified explanation of content for a specific audience: ${audience}`,
    properties: {
      simplifiedExplanationPart1: {
        type: 'string',
        description: `The FIRST THIRD of the chapter content, rewritten and explained in clear language appropriate for ${audience}. Maintain accuracy and conceptual integrity while using accessible terminology and relevant metaphors. Focus on substantive simplification of concepts rather than stylistic changes. Avoid conversational fillers, gimmicks, or artificially simplified tone. The reader is genuinely interested in understanding the material despite potential knowledge gaps. Keep the Alice/Bob dialog a part of the document. Format as Markdown. MAKE IT COMPLETE for this part. NO LIMITS ON CHARACTERS. `,
      },
      simplifiedExplanationPart2: {
        type: 'string',
        description: `The SECOND THIRD of the chapter content, rewritten and explained in clear language appropriate for ${audience}. Continue from the previous part. Maintain accuracy and conceptual integrity. Format as Markdown. MAKE IT COMPLETE for this part. NO LIMITS ON CHARACTERS. `,
      },
      simplifiedExplanationPart3: {
        type: 'string',
        description: `The FINAL THIRD of the chapter content, rewritten and explained in clear language appropriate for ${audience}. Continue from the previous part and complete the chapter. Maintain accuracy and conceptual integrity. Format as Markdown. MAKE IT COMPLETE for this part. NO LIMITS ON CHARACTERS. `,
      },
      explanationMethodology: {
        type: 'string',
        description: `max: 500chrs, Briefly describe your approach to adapting this content for ${audience}, focusing on conceptual translation strategies rather than tonal adjustments.`,
      },
    },
    required: [
      'simplifiedExplanationPart1',
      'simplifiedExplanationPart2',
      'simplifiedExplanationPart3',
      'explanationMethodology',
    ],
  };

  const userPrompt = `${expertSystemPrompt}
${extraPrompt ? `\nAdditional Instructions:\n${extraPrompt}\n` : ''}

Your task is to act as an expert educator. You are provided with a chapter of technical or complex documentation below. Your goal is to rewrite and explain this content in a clear, accessible manner for the target audience: **${audience}**.

Focus on substantive simplification through effective metaphors, precise language, and conceptual clarity. Maintain technical accuracy while making concepts more approachable. Do not use conversational fillers, unnecessary simplifications of tone, or stylistic gimmicks. The explanation should be educational and direct, not artificially casual.

Use analogies or examples when they genuinely clarify complex ideas. Explain necessary technical terms rather than avoiding them. Present the content in well-structured markdown.

IMPORTANT: Please provide your explanation in THREE SEPARATE PARTS, corresponding to 'simplifiedExplanationPart1', 'simplifiedExplanationPart2', and 'simplifiedExplanationPart3' in the schema. Each part should cover roughly one-third of the content.

Content to Simplify:
---
${contentToSimplify}
---

Please provide the simplified explanation in three parts and your methodology according to the schema.`;

  const messages = [
    {
      role: 'system',
      content:
        'You are an expert educator tasked with simplifying complex content for a specific audience. You will be provided with the content, the target audience, and a schema for your response. Ensure that every article and every field is complete and that you do not prematurely stop generating the content. Especially when it is around backticks and quotes. Ensure that you are escaping it properly and according to what is expected of Jason. Listen, but keep on writing the article. Do not stop.',
    },
    { role: 'user', content: userPrompt },
  ] as const;

  try {
    const response = await Request(
      { ...config, stream: true },
      simplificationSchema,
      messages,
      c => {
        console.log(c);
      }
    );
    if (
      response &&
      response[0] &&
      response[0].simplifiedExplanationPart1 &&
      response[0].simplifiedExplanationPart2 &&
      response[0].simplifiedExplanationPart3
    ) {
      const simplifiedContent =
        response[0].simplifiedExplanationPart1 +
        response[0].simplifiedExplanationPart2 +
        response[0].simplifiedExplanationPart3;
      const methodology = response[0].explanationMethodology;

      // Sanitize audience string for use in filename
      const safeAudienceString = audience.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      const outputFilename = `${chapterName}.eli.${safeAudienceString}.md`;
      const outputPath = path.join(outputDir, chapterName, outputFilename);

      fs.writeFileSync(outputPath, simplifiedContent, 'utf8');
      console.log(`Successfully generated simplified explanation: ${outputPath}`);
      console.log(`LLM Methodology for "${chapterName}" (audience: "${audience}"): ${methodology}`);
    } else {
      console.error(
        `Error: LLM response for "${chapterName}" (audience: "${audience}") was empty or not in the expected format (missing one or more explanation parts).`
      );
      if (response && response[0]) {
        console.error('LLM Raw Response Snippet:', JSON.stringify(response[0]).substring(0, 200));
      }
    }
  } catch (error) {
    console.error(
      `Error generating simplified explanation for "${chapterName}" (audience: "${audience}"):`,
      error instanceof Error ? error.message : String(error)
    );
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  }
}

/**
 * Generate vitest test file content
 * @param chapterName The name of the chapter.
 * @param questions Array of question entries for the chapter.
 * @param expertSystemPrompt The system prompt to guide the LLM's behavior, extracted from test-methodology.md.
 * @returns The content of the test file as a string.
 */
function generateTestFile(
  chapterName: string,
  questions: QuestionEntry[],
  expertSystemPrompt: string
): string {
  const jsDoc = `/**
 * @fileoverview Automated comprehension tests for ${chapterName}.
 *
 * These tests are automatically generated from the source documentation files
 * (e.g., Markdown chapters) and are designed to evaluate the clarity and
 * effectiveness of the documentation in conveying core concepts.
 *
 * The testing methodology, including content isolation (Bible vs. Manifest)
 * and scoping (Chapter vs. Complete), is detailed in:
 * /docs/prompts/test-methodology.md
 *
 * !! DO NOT EDIT THIS FILE DIRECTLY !!
 * Changes should be made in the source documentation from which these tests
 * are generated. This will ensure that tests remain synchronized with the
 * content they are intended to evaluate.
 */\n`;

  return `${jsDoc}import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Request, Provider } from '@augceo/agent';
import '@augceo/agent/provider/vertexai';
import { questions } from './${chapterName}.questions';
import dotenv from 'dotenv';

dotenv.config();

const chapterBibleContent = readFileSync(join(__dirname, '${chapterName}.bible.md'), 'utf-8');
const chapterManifestContent = readFileSync(join(__dirname, '${chapterName}.manifest.md'), 'utf-8');
const completeBibleContent = readFileSync(join(__dirname, '../Bible.md'), 'utf-8');
const completeManifestContent = readFileSync(join(__dirname, '../Manifest.md'), 'utf-8');

// Helper function to test a question with given content
async function testQuestion(questionKey: keyof typeof questions, content: string, testName: string) {
  const config = {
    provider: 'vertexai',
    model: 'gemini-2.0-flash',
    project: process.env.VERTEXAI_PROJECT,
    location: process.env.VERTEXAI_LOCATION,
    temperature: 0.5,
    maxTokens: 3000,
  } as const satisfies Provider.MinimalConfig;

  const schema = questions[questionKey].schema;
  const questionDescription = schema.description || '';

  const userMessageContent = \`${expertSystemPrompt}

Provided Content to analyze:
\${content}

Question based *only* on the provided content:
\${questionDescription}

Important: This is a multiple choice question. Only select the answers that are clearly supported by the content above. Do not try to select all options or be overly inclusive - be precise and selective.\`;

  const messages = [
    { role: 'system', content: 'You are an expert on the content provided. Answer the question based on the given content. For multiple choice questions, be selective and only choose the answers that are truly correct based on the content. Do not try to list all possible options - only select the ones that are actually supported by the provided material.' },
    { role: 'user', content: userMessageContent }
  ] as const;

  const response = await Request(config, schema, messages);
  expect(response).toBeDefined();
  expect(response[0]).toBeDefined();

  // Validate the response structure matches the schema
  expect(response[0]).toHaveProperty('answer');
  expect(response[0]).toHaveProperty('reasoning');
  expect(response[0]).toHaveProperty('interpretation');
  expect(response[0]).toHaveProperty('breakdown');
  expect(response[0]).toHaveProperty('confusion');
  expect(response[0]).toHaveProperty('suggestions');
  expect(Array.isArray(response[0].answer)).toBe(true);
  expect(typeof response[0].reasoning).toBe('string');

  // Check that the answer contains correct answers from the schema
  const correctAnswers = questions[questionKey].correctAnswers;
  const givenAnswers = response[0].answer;
  const aiReasoning = response[0].reasoning;
  const aiInterpretation = response[0].interpretation;
  const aiBreakdown = response[0].breakdown;
  const aiConfusion = response[0].confusion;
  const aiSuggestions = response[0].suggestions;
  const totalOptions = schema.properties.answer.items.enum.length;

  // console.log(\`\${testName} - Given answers:\`, givenAnswers);
  // console.log(\`\${testName} - Correct answers:\`, correctAnswers);
  // console.log(\`\${testName} - Total options available:\`, totalOptions);
  // console.log(\`\${testName} - AI reasoning:\`, aiReasoning);
  // console.log(\`\${testName} - AI interpretation:\`, aiInterpretation);
  // console.log(\`\${testName} - AI breakdown:\`, aiBreakdown);
  // console.log(\`\${testName} - AI confusion:\`, aiConfusion);
  // console.log(\`\${testName} - AI suggestions:\`, aiSuggestions);

  // Validate that AI didn't give too many answers (shouldn't select more than 70% of all options)
  const maxReasonableAnswers = Math.ceil(totalOptions * 0.7);
  expect(givenAnswers.length).toBeLessThanOrEqual(maxReasonableAnswers);

  // Validate that the AI didn't just select everything (should be selective)
  expect(givenAnswers.length).toBeLessThan(totalOptions);

  // Custom assertion for answer quality with detailed feedback
  const givenSet = new Set(givenAnswers);
  const correctSet = new Set(correctAnswers);
  const allOptionsSet = new Set(schema.properties.answer.items.enum);

  const correctlyChosen = givenAnswers.filter(answer => correctSet.has(answer)).sort();
  const missedCorrect = correctAnswers.filter(answer => !givenSet.has(answer)).sort();
  const incorrectlyChosen = givenAnswers.filter(answer => !correctSet.has(answer)).sort();

  // Create detailed status message
  const statusParts = [];
  if (correctlyChosen.length > 0) {
    statusParts.push(\`  • ✓ Correctly understood: \${correctlyChosen.length}/\${correctAnswers.length}\`);
    correctlyChosen.forEach(answer => statusParts.push(\`    - \${answer}\`));
  }
  if (missedCorrect.length > 0) {
    statusParts.push(\`  • ✗ Missed correct answers: \${missedCorrect.length}\`);
    missedCorrect.forEach(answer => statusParts.push(\`    - \${answer}\`));
  }
  if (incorrectlyChosen.length > 0) {
    statusParts.push(\`  • ✗ Incorrectly inferred: \${incorrectlyChosen.length}\`);
    incorrectlyChosen.forEach(answer => statusParts.push(\`    - \${answer}\`));
  }

  const statusMessage = statusParts.join('\\n');
  console.log(\`\${testName} - \${questionDescription}:\\n\${statusMessage}\`);

  // Assert that AI got at least some correct answers and didn't miss too many
  const hasAllCorrectAnswers = missedCorrect.length === 0;
  const hasNoIncorrectAnswers = incorrectlyChosen.length === 0;
  const hasAtLeastSomeCorrect = correctlyChosen.length > 0;

  // Custom assertion with detailed error message including AI reasoning
  if (!hasAllCorrectAnswers || !hasNoIncorrectAnswers) {
    const errorMessage = \`Answer quality assessment for \${testName}:\\n\${statusMessage}\\n
AI's reasoning: "\${aiReasoning}"\\n
AI's interpretation: "\${aiInterpretation}"\\n
AI's breakdown: "\${aiBreakdown}"\\n
AI's confusion: "\${aiConfusion}"\\n
AI's suggestions: "\${aiSuggestions}"\\n
Expected: All correct answers chosen, no incorrect answers
Actual: \${correctlyChosen.length}/\${correctAnswers.length} correct, \${incorrectlyChosen.length} incorrect\`;
    expect.fail(errorMessage);
  }

  // Fallback: at minimum, ensure some correct answers were chosen
  if (!hasAtLeastSomeCorrect) {
    const errorMessage = \`No correct answers were chosen at all for \${testName}\\n\${statusMessage}\\n
AI's reasoning: "\${aiReasoning}"\\n
AI's interpretation: "\${aiInterpretation}"\\n
AI's breakdown: "\${aiBreakdown}"\\n
AI's confusion: "\${aiConfusion}"\\n
AI's suggestions: "\${aiSuggestions}"\`;

    expect.fail(errorMessage);
  }
}

// Top-level describe for the chapter's tests
describe.concurrent(\`${chapterName} Comprehension Tests\`, () => {

  describe.concurrent('Bible - Chapter Scope', () => {
${questions
  .map(
    (
      q,
      index
    ) => `    it.concurrent(\`Q${index + 1}: ${q.schema.description.replace('Question: ', '').replace(/`/g, '\\`')} (Bible - Chapter Scope)\`, async () => {
      await testQuestion('Q${index + 1}', chapterBibleContent, '${chapterName} - Bible Q${index + 1} (Chapter Scope)');
    }, 30000);`
  )
  .join('\n\n')}
  });

  describe.concurrent('Manifest - Chapter Scope', () => {
${questions
  .map(
    (
      q,
      index
    ) => `    it.concurrent(\`Q${index + 1}: ${q.schema.description.replace('Question: ', '').replace(/`/g, '\\`')} (Manifest - Chapter Scope)\`, async () => {
      await testQuestion('Q${index + 1}', chapterManifestContent, '${chapterName} - Manifest Q${index + 1} (Chapter Scope)');
    }, 30000);`
  )
  .join('\n\n')}
  });

  describe.skip.concurrent('Bible - Complete Scope', () => {
${questions
  .map(
    (
      q,
      index
    ) => `    it.concurrent(\`Q${index + 1}: ${q.schema.description.replace('Question: ', '').replace(/`/g, '\\`')} (Bible - Complete Scope)\`, async () => {
      await testQuestion('Q${index + 1}', completeBibleContent, '${chapterName} - Bible Q${index + 1} (Complete Scope)');
    }, 30000);`
  )
  .join('\n\n')}
  });

  describe.skip.concurrent('Manifest - Complete Scope', () => {
${questions
  .map(
    (
      q,
      index
    ) => `    it.concurrent(\`Q${index + 1}: ${q.schema.description.replace('Question: ', '').replace(/`/g, '\\`')} (Manifest - Complete Scope)\`, async () => {
      await testQuestion('Q${index + 1}', completeManifestContent, '${chapterName} - Manifest Q${index + 1} (Complete Scope)');
    }, 30000);`
  )
  .join('\n\n')}
  });
}, 60000);
`;
}

// Main function
async function main(): Promise<void> {
  const program = new Command();
  program
    .option(
      '-e, --eli <audiences...>',
      "Explain Like I'm <audience> - Generate simplified chapter files for LLM processing targeting specific audiences. Provide one or more audience descriptions."
    )
    .option(
      '-p, --prompt <prompt>',
      'Additional prompt to be combined with the expert system prompt for LLM processing'
    )
    .option(
      '-i, --input-glob <glob>',
      'Glob pattern for input markdown files (e.g., "chapters/**/*.md")',
      path.join(SOURCE_DIR, '*.md') // Default value
    )
    .parse(process.argv);

  const options = program.opts();
  const eliAudiences = options.eli as string[] | undefined;
  const extraPrompt = options.prompt as string | undefined;
  const inputGlobPattern = options.inputGlob as string;

  dotenv.config();

  console.log('Starting document component extraction...');
  console.log(`Input glob pattern: ${inputGlobPattern}`);
  if (eliAudiences && eliAudiences.length > 0) {
    console.log(
      `Simplified file generation is ENABLED for audiences: "${eliAudiences.join('", "')}".`
    );
  } else {
    console.log('Simplified file generation is DISABLED.');
  }

  if (extraPrompt) {
    console.log('Additional LLM prompt provided:', extraPrompt);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    // Find all markdown files in the source directory
    const markdownFiles = await glob(inputGlobPattern);
    markdownFiles.sort();

    if (markdownFiles.length === 0) {
      console.error(`No markdown files found in ${SOURCE_DIR}`);
      process.exit(1);
    }

    console.log(`Found ${markdownFiles.length} markdown files to process`);

    // Extract the expert system prompt from test-methodology.md
    let expertSystemPrompt = '';
    try {
      const methodologyPath = path.join(__dirname, '..', 'prompts', 'test-methodology.md');
      const methodologyContent = fs.readFileSync(methodologyPath, 'utf8');
      const promptBlockRegex = /```prompt\n([\s\S]*?)```/;
      const promptMatch = methodologyContent.match(promptBlockRegex);
      if (promptMatch && promptMatch[1]) {
        expertSystemPrompt = promptMatch[1].trim();
        console.log(
          `Successfully extracted LLM expert prompt from test-methodology.md (${expertSystemPrompt.length} bytes)`
        );
      } else {
        console.warn(
          'Warning: Could not find the LLM expert prompt block (```prompt...```) in test-methodology.md. Tests will run without this specific guidance.'
        );
      }
    } catch (e) {
      console.warn(
        `Warning: Could not read or parse test-methodology.md for the LLM expert prompt. Error: ${e instanceof Error ? e.message : String(e)}. Tests will run without this specific guidance.`
      );
    }

    // Extract content from files
    const allChapters: ChapterContent[] = [];
    const allQuestions: QuestionEntry[] = [];
    const allLlmSections: LlmEntry[] = [];
    const eliPromises: Promise<void>[] = [];

    for (const filePath of markdownFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);
      const chapterName = getChapterName(fileName);

      console.log(`Processing ${fileName} -> ${chapterName}...`);

      // Extract JSON blocks and clean markdown
      let cleanedMarkdown = content;
      const chapterQuestions: QuestionEntry[] = [];
      const chapterLlmSections: LlmEntry[] = [];

      // Extract JSON blocks
      const jsonBlockRegex = /```json\n([\s\S]*?)```/g;
      let jsonMatch: RegExpExecArray | null;

      while ((jsonMatch = jsonBlockRegex.exec(content)) !== null) {
        continue;
      }

      // Extract quiz blocks and convert to JSON
      const quizBlockRegex = /```question\n([\s\S]*?)```/g;
      let quizMatch: RegExpExecArray | null;

      while ((quizMatch = quizBlockRegex.exec(content)) !== null) {
        try {
          const quizContent = quizMatch[1];
          const jsonObject = convertQuizToJson(quizContent);

          // Store the JSON object directly without source wrapper
          chapterQuestions.push(jsonObject);
          allQuestions.push(jsonObject);

          // Remove the quiz block from the markdown for Bible content
          cleanedMarkdown = cleanedMarkdown.replace(quizMatch[0], '');
        } catch (e) {
          if (e instanceof Error) {
            console.warn(`Warning: Failed to convert quiz block in ${fileName}:`, e.message);
          } else {
            console.warn(`Warning: Unknown error converting quiz block in ${fileName}`);
          }
        }
      }

      // Extract LLM sections
      const llmBlockRegex = /```llm\n([\s\S]*?)```/g;
      let llmMatch: RegExpExecArray | null;

      while ((llmMatch = llmBlockRegex.exec(content)) !== null) {
        const llmContent = llmMatch[1];

        const llmEntry = {
          source: fileName,
          content: llmContent,
        };

        chapterLlmSections.push(llmEntry);
        allLlmSections.push(llmEntry);

        // Remove the LLM block from the markdown for Bible content
        cleanedMarkdown = cleanedMarkdown.replace(llmMatch[0], '');
      }

      // Capture definitions content before it's removed for Bible content
      let capturedDefinitions = '';
      const definitionsBlockRegexForCapture = /```definitions\n([\s\S]*?)```/g;
      let defMatchForCapture: RegExpExecArray | null;
      while ((defMatchForCapture = definitionsBlockRegexForCapture.exec(content)) !== null) {
        capturedDefinitions += defMatchForCapture[1].trim() + '\n\n';
      }
      capturedDefinitions = capturedDefinitions.trim();

      // Extract and remove Definitions blocks for Bible content
      const definitionsBlockRegex = /```definitions\n([\s\S]*?)```/g;
      let definitionsMatch: RegExpExecArray | null;

      while ((definitionsMatch = definitionsBlockRegex.exec(content)) !== null) {
        // We only need to remove it from cleanedMarkdown for Bible content.
        // Definitions are not currently stored or used for Manifest content.
        cleanedMarkdown = cleanedMarkdown.replace(definitionsMatch[0], '');
      }

      // Store chapter content
      allChapters.push({
        name: chapterName,
        originalContent: content,
        cleanedMarkdown,
        questions: chapterQuestions,
        llmSections: chapterLlmSections,
        capturedDefinitions,
      });

      // Create chapter directory in compiled
      const chapterDir = path.join(OUTPUT_DIR, chapterName);
      if (!fs.existsSync(chapterDir)) {
        fs.mkdirSync(chapterDir, { recursive: true });
      }

      // Write chapter-specific files
      const sourceFile = path.join(chapterDir, `${chapterName}.md`);
      const bibleFile = path.join(chapterDir, `${chapterName}.bible.md`);
      const manifestFile = path.join(chapterDir, `${chapterName}.manifest.md`);
      const questionsFile = path.join(chapterDir, `${chapterName}.questions.ts`);
      const testFile = path.join(chapterDir, `${chapterName}.test.ts`);

      // Write source amalgamation (original content)
      fs.writeFileSync(sourceFile, content, 'utf8');
      console.log(`Created chapter source: ${sourceFile}`);

      fs.writeFileSync(bibleFile, cleanedMarkdown, 'utf8');
      console.log(`Created chapter Bible: ${bibleFile}`);

      const chapterLlmMarkdown = chapterLlmSections.map(entry => entry.content).join('\n\n---\n\n');
      fs.writeFileSync(manifestFile, chapterLlmMarkdown, 'utf8');
      console.log(`Created chapter Manifest: ${manifestFile}`);

      const questionsContent = generateQuestionsFile(chapterQuestions);
      fs.writeFileSync(questionsFile, questionsContent, 'utf8');
      console.log(`Created chapter questions: ${questionsFile}`);

      const testContent = generateTestFile(chapterName, chapterQuestions, expertSystemPrompt);
      fs.writeFileSync(testFile, testContent, 'utf8');
      console.log(`Created chapter test: ${testFile}`);

      if (eliAudiences && eliAudiences.length > 0) {
        const simplifiedFilePath = path.join(chapterDir, `${chapterName}.simplified.md`);
        // Content for .simplified.md (bible + manifest + definitions)
        const simplifiedContentPartsForFile: string[] = [];
        simplifiedContentPartsForFile.push(`<!-- Source Chapter File: ${fileName} -->\n`);
        simplifiedContentPartsForFile.push('## Bible Content (Main Text)\n\n');
        simplifiedContentPartsForFile.push(cleanedMarkdown.trim());

        if (chapterLlmSections.length > 0) {
          simplifiedContentPartsForFile.push('\n\n---\n## Manifest Content (LLM Instructions)\n\n');
          simplifiedContentPartsForFile.push(
            chapterLlmSections.map(entry => entry.content.trim()).join('\n\n---\n\n')
          );
        }

        if (capturedDefinitions) {
          simplifiedContentPartsForFile.push('\n\n---\n## Definitions (Glossary)\n\n');
          simplifiedContentPartsForFile.push(capturedDefinitions);
        }

        const finalSimplifiedContentForFile =
          simplifiedContentPartsForFile
            .map(p => p.trim())
            .filter(p => p)
            .join('\n\n') + '\n';
        fs.writeFileSync(simplifiedFilePath, finalSimplifiedContentForFile, 'utf8');
        console.log(`Created chapter simplified source for LLM: ${simplifiedFilePath}`);

        // Now, call the LLM to generate the audience-specific explanation
        for (const audience of eliAudiences) {
          eliPromises.push(
            generateAudienceTargetedExplanation(
              chapterName,
              audience,
              finalSimplifiedContentForFile,
              expertSystemPrompt,
              OUTPUT_DIR,
              extraPrompt
            )
          );
        }
      }
    }

    // Write compiled full files
    const fullBible = allChapters.map(ch => ch.cleanedMarkdown).join('\n\n');
    const fullManifest = allLlmSections
      .map(entry => `## From ${entry.source}\n\n${entry.content}\n`)
      .join('\n\n---\n\n');

    fs.writeFileSync(path.join(OUTPUT_DIR, 'Bible.md'), fullBible, 'utf8');
    console.log(`Created full Bible: ${path.join(OUTPUT_DIR, 'Bible.md')}`);

    fs.writeFileSync(path.join(OUTPUT_DIR, 'Manifest.md'), fullManifest, 'utf8');
    console.log(`Created full Manifest: ${path.join(OUTPUT_DIR, 'Manifest.md')}`);

    const fullQuestionsContent = generateQuestionsFile(allQuestions);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'questions.ts'), fullQuestionsContent, 'utf8');
    console.log(`Created full questions: ${path.join(OUTPUT_DIR, 'questions.ts')}`);

    // Wait for all ELI generations to complete
    if (eliPromises.length > 0) {
      console.log(
        `Waiting for ${eliPromises.length} audience-targeted explanations to complete...`
      );
      await Promise.all(eliPromises);
      console.log('All audience-targeted explanations have been generated.');
    }

    console.log('Processing complete!');
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error occurred');
    }
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
