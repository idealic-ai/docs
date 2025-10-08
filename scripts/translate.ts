import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { translateDocument } from '../src/data/translator';

// This is a placeholder. In a real scenario, we'd fetch this from a reliable source.
const styleExample = {
  original: `
# Introduction

This document outlines the core principles of our project. Our goal is to create a transparent and efficient system.
  `,
  translated: `
# Введение

Этот документ излагает основные принципы нашего проекта. Наша цель — создать прозрачную и эффективную систему.
  `,
};

async function main() {
  const files = await glob('docs/**/*.md');
  const targetLang = 'ru';
  const translationsDir = path.resolve(process.cwd(), 'docs', 'translations', targetLang);
  await fs.mkdir(translationsDir, { recursive: true });

  for (const file of files) {
    console.log(`Translating ${file}...`);
    try {
      const content = await fs.readFile(file, 'utf-8');
      const translatedContent = await translateDocument(content, styleExample, 'Russian');

      const relativePath = path.relative('docs', file);
      const newPath = path.join(translationsDir, relativePath);

      await fs.mkdir(path.dirname(newPath), { recursive: true });
      await fs.writeFile(newPath, translatedContent);
      console.log(`Successfully translated ${file} to ${newPath}`);
    } catch (error) {
      console.error(`Failed to translate ${file}:`, error);
    }
  }
}

main().catch(console.error);
