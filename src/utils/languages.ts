export const LANGUAGES = ['en', 'ru', 'simple-en', 'simple-ru'] as const;
export type Language = (typeof LANGUAGES)[number];
