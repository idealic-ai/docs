import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';

// A case-insensitive map of Russian terms (and their inflections) to their canonical English version.
const ruTermMap: Record<string, string> = {
  // Call
  вызов: 'Call',
  вызова: 'Call',
  вызовов: 'Call',
  вызовы: 'Call',
  вызовом: 'Call',
  вызову: 'Call',
  вызовам: 'Call',

  // Tool
  инструмент: 'Tool',
  инструмента: 'Tool',
  инструментов: 'Tool',
  инструментам: 'Tool',
  инструментом: 'Tool',
  инструменты: 'Tool',
  'вызовов инструментов': 'Tool Call',
  'вызов инструмента': 'Tool Call',

  // Request
  запрос: 'Request',
  запроса: 'Request',
  запросу: 'Request',
  запросом: 'Request',
  запросов: 'Request',

  // Activity
  действие: 'Activity',
  действием: 'Activity',

  // Delegate
  делегат: 'Delegate',
  делегату: 'Delegate',
  делегатом: 'Delegate',

  // Scope
  'область видимости': 'Scope',
  'областей видимости': 'Scope',
  'контекст с ограниченным доступом': 'Scope',

  // State
  состояние: 'State',
  состоянии: 'State',
  'сообщение о состоянии': 'State Message',

  // Instance
  экземпляр: 'Instance',
  экземпляров: 'Instance',
  экземплирование: 'Instancing',
  экземпляры: 'Instance',

  // Vessel
  носитель: 'Vessel',
  носителем: 'Vessel',

  // Idea
  идея: 'Idea',
  идею: 'Idea',

  // Ideator
  идеатор: 'Ideator',

  // Transformers
  'трансформатор идей': 'Idea Transformer',

  // Messages
  'входное сообщение': 'Input Message',
  'сообщение с данными': 'Data Message',

  // Loop
  цикл: 'Loop',
  'цикла выполнения': 'Execution Loop',

  // Other Concepts
  'hitl (человек-в-цикле)': 'HITL (Human-in-the-Loop)',
  эволюция: 'Evolution',
  'ии-центричная': 'AI-Native',
  план: 'Plan',
  'процесс-идея': 'Process Idea',
  'идея-носитель': 'Vessel Idea',
  реактор: 'Reactor',
  решение: 'Solution',
  контекст: 'context',
  схема: 'schema',
  'ссылка на переменную': 'Variable Reference',
};

const langTermMaps: Record<string, Record<string, string>> = {
  ru: ruTermMap,
};

async function processFile(filePath: string, termMap: Record<string, string>) {
  let content = await fs.readFile(filePath, 'utf-8');
  let changed = false;

  const regex = /:term\[([^\]]+)\](?![\s]*\{[^\}]*canonical)/g;

  const newContent = content.replace(regex, (match, term) => {
    const termKey = term.toLowerCase().trim();
    const canonical = termMap[termKey];

    if (canonical) {
      changed = true;
      return `:term[${term}]{canonical="${canonical}"}`;
    } else {
      console.warn(`- No canonical form found for term "${term}" in ${path.basename(filePath)}`);
      return match;
    }
  });

  if (changed) {
    await fs.writeFile(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

async function main() {
  console.log('Starting script to add canonical tags to :term definitions...');
  const targetLangs = ['ru'];

  for (const lang of targetLangs) {
    const termMap = langTermMaps[lang];
    if (!termMap) {
      console.warn(`No term map defined for language: ${lang}`);
      continue;
    }

    console.log(`\nProcessing language: ${lang}`);
    const files = await glob(`docs/translations/${lang}/**/*.md`);
    if (files.length === 0) {
      console.log(`No markdown files found for ${lang}.`);
      continue;
    }

    for (const file of files) {
      await processFile(file, termMap);
    }
  }

  console.log('\nScript finished.');
}

main().catch(console.error);
