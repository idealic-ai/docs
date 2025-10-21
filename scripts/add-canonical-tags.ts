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
  вызове: 'Call',
  вызовами: 'Call',

  // Tool
  инструмент: 'Tool',
  инструмента: 'Tool',
  инструментов: 'Tool',
  инструментам: 'Tool',
  инструментом: 'Tool',
  инструменты: 'Tool',
  инструменту: 'Tool',
  инструментами: 'Tool',
  инструменте: 'Tool',
  'вызовов инструментов': 'Tool Call',
  'вызов инструмента': 'Tool Call',
  'вызовы инструментов': 'Tool Call',
  'вызова инструмента': 'Tool Call',

  // Request
  запрос: 'Request',
  запроса: 'Request',
  запросу: 'Request',
  запросом: 'Request',
  запросов: 'Request',
  запросы: 'Request',
  запросе: 'Request',

  // Activity
  действие: 'Activity',
  действием: 'Activity',
  действия: 'Activity',
  действию: 'Activity',
  действий: 'Activity',

  // Delegate
  делегат: 'Delegate',
  делегату: 'Delegate',
  делегатом: 'Delegate',

  // Scope
  'область видимости': 'Scope',
  'области видимости': 'Scope',
  'областей видимости': 'Scope',
  'контекст с ограниченным доступом': 'Scope',
  скоупы: 'Scope',
  скоупов: 'Scope',
  областивидимости: 'Scope',
  области: 'Scope',
  областей: 'Scope',

  // State
  состояние: 'State',
  состоянии: 'State',
  состояния: 'State',
  состоянием: 'State',
  'сообщение о состоянии': 'State Message',

  // Instance
  экземпляр: 'Instance',
  экземпляров: 'Instance',
  экземплирование: 'Instancing',
  экземпляры: 'Instance',
  экземпляром: 'Instance',
  экземпляру: 'Instance',
  экземплирования: 'Instancing',
  экземплированием: 'Instancing',
  экземплированию: 'Instancing',

  // Vessel
  носитель: 'Vessel',
  носителем: 'Vessel',

  // Idea
  идея: 'Idea',
  идею: 'Idea',
  идеи: 'Idea',
  идей: 'Idea',
  идеей: 'Idea',

  // Ideator
  идеатор: 'Ideator',
  идеатором: 'Ideator',

  // Transformers
  'трансформатор идей': 'Idea Transformer',

  // Messages
  'входное сообщение': 'Input Message',
  'входного сообщения': 'Input Message',
  'сообщение с данными': 'Data Message',
  ввод: 'Input',
  ввода: 'Input',
  входное: 'Input',
  входном: 'Input',
  входного: 'Input',
  входные: 'Input',
  'входные данные': 'Input',
  'входных данных': 'Input',
  данные: 'Data',
  данными: 'Data',
  данных: 'Data',

  // Loop
  цикл: 'Loop',
  цикла: 'Loop',
  'цикла выполнения': 'Execution Loop',
  'цикл выполнения': 'Execution Loop',
  'циклом выполнения': 'Execution Loop',
  'цикле выполнения': 'Execution Loop',
  'цикле исполнения': 'Execution Loop',

  // Other Concepts
  'hitl (человек-в-цикле)': 'HITL (Human-in-the-Loop)',
  'человек-в-цикле': 'HITL (Human-in-the-Loop)',
  hitl: 'HITL (Human-in-the-Loop)',
  эволюция: 'Evolution',
  'ии-центричная': 'AI-Native',
  план: 'Plan',
  плана: 'Plan',
  планом: 'Plan',
  плану: 'Plan',
  планов: 'Plan',
  плане: 'Plan',
  'процесс-идея': 'Process Idea',
  'идея процесса': 'Process Idea',
  'идея-носитель': 'Vessel Idea',
  реактор: 'Reactor',
  решение: 'Solution',
  решения: 'Solution',
  решении: 'Solution',
  контекст: 'context',
  контексте: 'context',
  контекста: 'context',
  схема: 'schema',
  схему: 'schema',
  схеме: 'schema',
  схемы: 'schema',
  'ссылка на переменную': 'Variable Reference',
  'ссылки на переменную': 'Variable Reference',
  'ссылкой на переменную': 'Variable Reference',
  'ссылками на переменные': 'Variable Reference',
  'ссылки на переменные': 'Variable Reference',
  'ссылок на переменные': 'Variable Reference',
  'ссылку на переменную': 'Variable Reference',
  переменные: 'Variable',
  переменных: 'Variable',
  'протокол данных': 'Data',
  'реестр инструментов': 'Tool',
  'реестр действий': 'Activity',

  // English terms
  input: 'Input',
  data: 'Data',
  plan: 'Plan',
};

const enTermMap: Record<string, string> = {
  input: 'Input',
  data: 'Data',
  plan: 'Plan',
  scope: 'Scope',
  scopes: 'Scope',
  call: 'Call',
  calls: 'Call',
  idea: 'Idea',
  ideas: 'Idea',
  activity: 'Activity',
  activities: 'Activity',
  delegate: 'Delegate',
  instancing: 'Instancing',
  state: 'State',
  instance: 'Instance',
  solution: 'Solution',
  tool: 'Tool',
  tools: 'Tool',
  vessel: 'Vessel',
  request: 'Request',
  'tool registry': 'Tool',
  'activity registry': 'Activity',
  context: 'context',
  schema: 'schema',
};

const langTermMaps: Record<string, Record<string, string>> = {
  ru: ruTermMap,
  'simple-ru': ruTermMap,
  'simple-en': enTermMap,
  en: enTermMap,
};

async function processFile(filePath: string, termMap: Record<string, string>) {
  let content = await fs.readFile(filePath, 'utf-8');
  let changed = false;

  const regex = /:term\[([^\]{}]+)\](?!\s*\{)/g;

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
  const targetLangs = ['ru', 'simple-ru', 'en', 'simple-en'];

  for (const lang of targetLangs) {
    const termMap = langTermMaps[lang];
    if (!termMap) {
      console.warn(`No term map defined for language: ${lang}`);
      continue;
    }

    console.log(`\nProcessing language: ${lang}`);
    const files = await glob(`./translations/${lang}/**/*.md`);
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
